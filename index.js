const express = require("express");
const app = express();
const jsonParser = express.json();
app.use(jsonParser);
const PORT = 4000;
const partnersRouters = require("./routers/partners");

// cors

app.use("/partners", partnersRouters);

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
