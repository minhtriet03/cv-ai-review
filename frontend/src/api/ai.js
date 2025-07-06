import api from "./index";

const callChatGPT = async () => {
  const response = await api.post("/chatgpt", { prompt: "Hãy giúp tôi sửa CV!" });

  const data = await response.json();
  console.log("ChatGPT:", data.reply);
};
