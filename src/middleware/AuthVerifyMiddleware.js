const jwt = require("jsonwebtoken");
const isLogin = (req, res, next) => {
  const token = req.headers.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { email } = decoded;
    req.email = email;
    next();
  } catch (err) {
    next("Authentication failure!");
  }
};
module.exports = isLogin;
