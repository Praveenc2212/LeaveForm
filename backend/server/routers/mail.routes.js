import express from "express";
const router = express.Router();

import  sendMail   from "../services/EmailService/sendEmail.js";

router.post("/send", async (req, res) => {

  const { to, subject, message } = req.body;

  const result = await sendMail(to, subject, message);

  if (result) {
    res.json({ success: true, msg: "Email sent" });
  } else {
    res.status(500).json({ success: false, msg: "Email failed" });
  }
});

export default router;