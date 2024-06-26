const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class userController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect Email or Password"));
    }
    const canditate = await User.findOne({ where: { email } });
    if (canditate) {
      return next(ApiError.badRequest("User under this email already exist"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Username by this name dont finded"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("wrong password"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.emailm, req.user.role);
    return res.json({ token });
  }
}

module.exports = new userController();
