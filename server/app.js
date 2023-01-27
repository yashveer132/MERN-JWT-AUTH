require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn.js");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.port || 8009;

// app.get("/", (req, res) => {
//   res.status(201).json("Server created");
// });
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server started at Port number ${port}`);
});
