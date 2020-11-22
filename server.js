const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/register", require("./routes/api/register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/book/bookSlots", require("./routes/book/bookSlots"));
app.use("/book/getSlots", require("./routes/book/getSlots"));
app.use("/book/getComp", require("./routes/book/getComp"));
app.use("/book/getBookDets", require("./routes/book/getBookDets"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started");
});
