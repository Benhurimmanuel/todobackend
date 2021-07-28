const {
  getGoogleAuthURLService,
  getGoogleUserService,
  userStorageService,
} = require("./login-service");

const googleAuthController = (req, res, next) => {
  try {
    const googleAuthService = getGoogleAuthURLService();
    res.redirect(googleAuthService);
  } catch (error) {
    next(error);
  }
};

const getUserDetailsController = async (req, res, next) => {
  try {
    const { code } = req.query;
    const userProfile = await getGoogleUserService(code);
    const user = await userStorageService(userProfile);
    if (user) {
      req.session.user = user;
      res.redirect("http://127.0.0.1:3000/");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { googleAuthController, getUserDetailsController };
