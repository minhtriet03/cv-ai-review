const callChatGPT = async () => {
  const response = await fetch("http://localhost:5000/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: "Hãy giúp tôi sửa CV!" }),
  });

  const data = await response.json();
  console.log("ChatGPT:", data.reply);
};
