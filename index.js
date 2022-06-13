const express = require("express");
const app = express();
const jsonParser = express.json();
const PORT = 4000;
const partnersRouter = require("./routers/partners");
const authRouter = require("./routers/auth");
const cors = require("cors");

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
