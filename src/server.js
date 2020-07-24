require("dotenv/config");
const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded());

const address = process.env.GMAIL_ADDRESS;
const passwd = process.env.GMAIL_PASSWORD;

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: address,
    pass: passwd,
  },
});

app.post("/contact", function (req, res) {
  mailer.sendMail(
    {
      from: address,
      to: req.body.to,
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function (err, info) {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

app.listen(80);
