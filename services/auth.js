let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/user.model');


const getToken = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate Token
      let token = jwt.sign(
        {
          id: id,
          algorithm: "HS256",
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      return resolve(token);
    } catch (err) {
      return reject(err);
    }
  });
};

// Validating Token
const isAuthorised = async (req, res, next) => {
  let token = req.headers.authorization;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Please send token with api." });
  }

  try {
    const decodedToken = await verifyToken(token);

    let user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid token. No User found with the Id.",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };
    // const tokenExpire = await authenticate.checkExpiration(token);

    // if (!tokenExpire)
    //   return res.status(401).json({ status: 0, message: 'Token expired.' });

    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res
        .status(401)
        .json({ payload: jwt.decode(token), expired: true });
    }
    return res.status(401).json({ status: 0, message: error.message });
  }
};

const verifyToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tokenDetails = Buffer.from(token, "binary").toString();

      var decoded = jwt.verify(tokenDetails, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) {
        return resolve(false);
      }
      return resolve(decoded);
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  getToken,
  isAuthorised,
};
