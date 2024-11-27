const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const authRouter = require("./routes/authRouter");
const googleRouter=require("./routes/googleRouter")
//db connection
require("./db/db");
//middleware

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/google",googleRouter)
//template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/config/email/views"));

const port = process.env.PORT_NUMBER || 3000;
app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
