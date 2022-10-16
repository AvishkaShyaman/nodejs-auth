const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    pushToken: {
      type: String,
    },
    data: {},
  },
  { timestamps: true }
);
module.exports = mongoose.model('users', UserSchema);
