const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const login = async (req, res) => {
};

const signUp = async (req, res) => {
  try {
    const {
      body: { email, password, name, role },
    } = req;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw 'Email "' + email + '" is already registered';
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    const user = await newUser.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error,
    });
  }
};

module.exports = {
  login,
  signUp,
};
