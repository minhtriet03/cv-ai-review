const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

const chatDeepSeek = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("📥 Received Prompt:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt không được để trống!" });
    }

    const response = await axios.post(
      process.env.OPENAI_API_URL,
      {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📤 DeepSeek Response:", response.data);
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi OpenRouter API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Lỗi server khi gọi OpenRouter API!",
      details: error.response?.data || error.message,
    });
    res.status(401).json({
      error: "lỗi xác thực token",
      details: error.response?.data || error.message,
    })
  }

};

module.exports = { chatDeepSeek };
