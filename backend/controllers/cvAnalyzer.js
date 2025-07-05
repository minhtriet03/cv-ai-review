const axios = require("axios");
const CV = require("../models/cvModel");
const pdf = require("pdf-parse");
require("dotenv").config();

// Hàm để tải PDF từ URL
const fetchPdfFromUrl = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi khi tải PDF: ${error.message}`);
  }
};

// Hàm phân tích CV
exports.analyzeCV = async (req, res) => {
  try {
    const { cvId } = req.params;

    const cv = await CV.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV không tồn tại" });
    }

    console.log(cv);
    const pdfBuffer = await fetchPdfFromUrl(cv.cvUrl);
    const pdfData = await pdf(pdfBuffer);
    const cvContent = pdfData.text;

    const prompt = `
    Bạn là một chuyên gia phân tích CV với năng lực AI. Nhiệm vụ của bạn là phân tích file CV được cung cấp dựa trên các tiêu chí sau và đưa ra nhận xét chi tiết kèm theo gợi ý cải thiện.
    Viết bằng tiếng Việt Nam và tóm tắt nội dung ngắn gọn.
    ... (nội dung tiêu chí như bạn đã viết ở trên) ...

    Bạn hãy đánh giá trên thang điểm 10 ví dụ : 8/10 và để nó dưới cuối.
    Nội dung CV cần phân tích:
    ${cvContent}
    `;

    console.log("CV Content:", cvContent);

    const openAIResponse = await axios.post(
       "https://openrouter.ai/api/v1/chat/completions", // Sửa thành endpoint chat completions
       {
       model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      
       messages: [ 
       { role: "user", content: prompt } // Nội dung prompt nằm trong message
       ],
       max_tokens: 1000,  // Tuỳ chỉnh theo yêu cầu
       temperature: 0.7, // Điều chỉnh độ sáng tạo của kết quả
      },
       {
       headers: {
       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Đảm bảo key chính xác
       "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
       "X-Title": "CV Review App", // Tuỳ chỉnh tên ứng dụng của bạn
       },
       }
       );
    
    const choices = openAIResponse.data?.choices;
    if (!choices || !choices[0]?.message?.content) {
      return res.status(500).json({ message: "Dữ liệu phản hồi không hợp lệ", raw: openAIResponse.data });
    }
    
    const review = choices[0].message.content;

    cv.content = cvContent;
    cv.review = review;
    await cv.save();

    res.json({
      message: "CV phân tích thành công",
      review,
      cvContent,
    });
  } catch (error) {
    let errorDetails = {
      message: error.message,
    };
  
    if (error.response) {
      console.log("KEY:", process.env.OPENAI_API_KEY);
      errorDetails = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      };
    } else if (error.request) {
      // Request đã được gửi nhưng không có phản hồi
      errorDetails = {
        message: "No response received from OpenRouter",
      };
    }
  
    console.error("Lỗi khi phân tích CV:", errorDetails);
  
    res.status(500).json({
      message: "Lỗi khi phân tích CV",
      error: errorDetails,
    });
  }
};
