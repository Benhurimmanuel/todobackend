const path = require("path");
require("dotenv").config({ path: __dirname + "/config/config.env" });
const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const ConnectDB = require("./config/db");
const toDoRoutes = require("./modules/todo/todo-routes");
const loginRoutes = require("./modules/auth/login-routes");

const app = express();
ConnectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 3 },
  })
);
const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/google");
  }
};

// // Routes
app.use("/auth", loginRoutes);
app.use("/", authMiddleware, toDoRoutes);

// error Handleing
app.use((error, req, res, next) => {
  let response = {
    status: false,
  };
  if (error) {
    response.message = error.message;
    res.send(response);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running in ${process.env.PORT}`);
});
