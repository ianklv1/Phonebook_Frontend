export const htmlString = resetLink => `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 20px;
      text-align: center;
    }
    h1 {
      color: #555;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      font-size: 16px;
      color: white;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      cursor: pointer;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <h1>Thank you for using <i>MedImpact Phonebook System</i></h1>
  <p>
    Here is your Password Reset Link. This link will expire after <strong>10 minutes</strong>.
  </p>
  <a href="${import.meta.env.VITE_PUBLIC_APPLICATION_URL}/forgotpassword/${resetLink}" class="button">Reset Password</a>
  <div class="footer">
    Regards,<br>
    <Application Name Here> MedImpact Team
  </div>
</body>
</html>
`
