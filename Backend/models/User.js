const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', UserSchema);
