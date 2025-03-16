const express = require("express");
const { google } = require("googleapis");
const readline = require("readline");

const app = express();
const port = 5000;

const oauth2Client = new google.auth.OAuth2(
  "891731225957-95seicb4gnc5uaq8suqacas7r0ltujjb.apps.googleusercontent.com",
  "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",
  "http://localhost:5000/auth/callback"
);

// 🔹 Tạo URL để người dùng đăng nhập
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
});

console.log("Authorize this app by visiting this URL:", authUrl);

// 🔹 Xử lý khi Google gọi lại với mã `code`
app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    console.log("Your refresh token:", tokens.refresh_token);
    res.send("Authentication successful! You can close this tab.");
  } catch (err) {
    console.error("Error retrieving access token", err);
    res.status(500).send("Authentication failed");
  }
});

// 🔹 Chạy server Express
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
