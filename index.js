const corseMiddleware = require("cors");
const express = require("express");
const app = express();
const jsonParser = express.json();
const nodemailer = require("nodemailer");
const PORT = 4000;
const partnersRouter = require("./routers/partners");
const authRouter = require("./routers/auth");
require("dotenv").config();

app.use(corseMiddleware());
app.use(jsonParser);

app.use("/partners", partnersRouter);
app.use("/auth", authRouter);

app.get("/", (req, res, next) => {
  try {
    res.send("hello");
  } catch (e) {
    console.log(e);
    next(e);
  }
});

const contactEmail = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "marian_project@outlook.com",
    pass: process.env.MAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/email", (req, res) => {
  const type = req.body.type;
  const date = req.body.date;
  const reminder = req.body.reminder;

  const mail = {
    from: type,
    to: "marian_project@outlook.com",
    subject: "Contact Form Submission",
    html: `<p>Type: ${type}</p>
           <p>Date: ${date}</p>
           <p>Reminder in: ${reminder}</p>
          `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
