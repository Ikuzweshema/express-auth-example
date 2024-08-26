const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ejs = require("ejs"); // Import EJS
const authRouter = require("./routes/authRouter");

//db connection
require("./db/db");
//middleware

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);

//template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/config/email/views"));

const port = process.env.PORT_NUMBER || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
