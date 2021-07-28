const express = require("express");
const router = express.Router();
const {
  googleAuthController,
  getUserDetailsController,
} = require("./login-controllers");
const fetch = require("node-fetch");

router.get("/google", googleAuthController);

router.get("/google/callback", getUserDetailsController);

router.get("/logout", (req, res, next) => {
  delete req.session.user;
  res.send("logout succesful");
});

module.exports = router;
