const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendPasswordResetEmail = async (email, resetToken) => {
  console.log("Email User:", process.env.EMAIL_USER);
  console.log("Email Pass:", process.env.EMAIL_PASS ? "✅ Exists" : "❌ Missing");
  console.log("Frontend URL:", process.env.FRONTEND_URL);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🔐 Reset Your Password",
    // text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
    html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }
    .content {
      font-size: 16px;
      color: #555;
      line-height: 1.5;
    }
    .btn {
      display: block;
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
    .btn a {
      background-color: #007bff;
      color: #fff;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🔐 Reset Your Password</div>
    <div class="content">
      <p>We received a request to reset your password. Click the button below to set a new password.</p>
      <div class="btn">
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">
          Reset Password
        </a>
      </div>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">© 2025 Your Company. All rights reserved.</div>
  </div>
</body>
</html>

    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully");
};
