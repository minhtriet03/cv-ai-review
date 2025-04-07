// backend/controllers/cvAnalyzer.js
const axios = require("axios");
const CV = require("../models/cvModel");
const pdf = require("pdf-parse");

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
    const { cvId } = req.params; // Lấy cvId từ params

    // Tìm CV trong database
    
    const cv = await CV.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV không tồn tại" });
    }

    // Tải PDF từ URL Cloudinary
    const pdfBuffer = await fetchPdfFromUrl(cv.cvUrl);

    // Parse nội dung PDF
    const pdfData = await pdf(pdfBuffer);
    const cvContent = pdfData.text;

    // Tạo prompt để gửi cho OpenAI
    const prompt = `
    Bạn là một chuyên gia phân tích CV với năng lực AI. Nhiệm vụ của bạn là phân tích file CV được cung cấp dựa trên các tiêu chí sau và đưa ra nhận xét chi tiết kèm theo gợi ý cải thiện.

    Hãy thực hiện phân tích theo các khía cạnh sau:

    1. **Độ dài, khả năng đọc và độ chi tiết:**
      - Đánh giá độ dài của CV: Liệu nó có đủ thông tin nhưng không quá dài không?
      - Khả năng đọc: CV có rõ ràng, mạch lạc và dễ hiểu không?
      - Độ chi tiết: Các thông tin có được trình bày chi tiết và đầy đủ không? Nếu cần, đề xuất cách rút gọn hoặc bổ sung.

    2. **Mức độ liên quan đến mục tiêu (ví dụ: đơn xin việc chuyên nghiệp hoặc đăng ký đại học):**
      - Kiểm tra xem CV có được tùy chỉnh phù hợp với mục tiêu ứng tuyển không (chẳng hạn nhấn mạnh thành tích học tập, hoạt động ngoại khóa nếu ứng tuyển đại học, hoặc các kinh nghiệm chuyên môn nếu ứng tuyển việc làm).

    3. **Thành tựu định lượng:**
      - Xem xét các câu mô tả thành tựu, kiểm tra xem có bao gồm các số liệu định lượng (ví dụ: "nâng cao hiệu quả X%", "tiết kiệm chi phí Y") để thể hiện rõ tác động của công việc hay không.
      - Đề xuất bổ sung các số liệu định lượng nếu chưa có.

    4. **Thông tin liên hệ:**
      - Kiểm tra CV có cung cấp đầy đủ các thông tin liên hệ (địa chỉ, số điện thoại, email, trang web) không.

    5. **Thông tin chôn vùi (nếu có):**
      - Đánh giá vị trí của phần "Kỹ năng" và các thông tin quan trọng khác. Đề xuất chuyển phần kỹ năng lên cao nếu chúng có liên quan trực tiếp đến vị trí ứng tuyển.

    6. **Sự không phù hợp:**
      - Xác định và báo cáo bất kỳ nội dung nào không phù hợp hoặc không liên quan đến mục tiêu ứng tuyển.

    7. **Động từ hành động:**
      - Kiểm tra các câu mô tả công việc có bắt đầu bằng động từ hành động mạnh mẽ hay không. Đề xuất thay đổi nếu cần.

    8. **Từ khóa:**
      - Kiểm tra xem CV có sử dụng các từ khóa quan trọng (ví dụ: "quản lý dự án", "sản xuất", "kỹ thuật", "sigma") không.
      - Đề xuất điều chỉnh từ khóa để phù hợp với mô tả công việc cụ thể.

    9. **Công ước tiêu chuẩn của CV:**
      - Đánh giá cách sắp xếp và trình bày thông tin: Tiêu đề (bao gồm thông tin liên hệ), phần "Tóm tắt" hay "Mục tiêu", trình bày kinh nghiệm làm việc theo thứ tự thời gian, phần giáo dục, mục kỹ năng…
      - Xác định xem phần nào cần được làm nổi bật hoặc thay đổi vị trí để tạo ấn tượng tốt hơn.

    Sau khi phân tích, hãy tổng hợp các nhận xét theo từng mục ở trên và đưa ra các khuyến nghị cụ thể để cải thiện CV. Hãy trình bày báo cáo một cách rõ ràng, mạch lạc và chuyên nghiệp.

    Nội dung CV cần phân tích:
    ${cvContent}
    `;
    // Gọi OpenAI API để phân tích CV
    // log cvContent
    console.log("CV Content:", cvContent);
    
    const openAIResponse = await axios.post(
      process.env.OPENAI_API_URL,
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    const review = openAIResponse.data.choices[0].message.content;

    // Cập nhật CV với nội dung và đánh giá
    cv.content = cvContent;
    cv.review = review;
    await cv.save();

    res.json({
      message: "CV phân tích thành công",
      review,
      cvContent,
    });
  } catch (error) {
    console.error("Lỗi khi phân tích CV:", error);
    res.status(500).json({
      message: "Lỗi khi phân tích CV",
      error: error.message,
    });
  }
};
