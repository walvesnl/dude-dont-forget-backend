const corseMiddleware = require("cors");
const express = require("express");
const app = express();
const jsonParser = express.json();
const PORT = 4000;
const partnersRouter = require("./routers/partners");
const authRouter = require("./routers/auth");

app.use(corseMiddleware());
app.use(jsonParser);

app.use("/partners", partnersRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
