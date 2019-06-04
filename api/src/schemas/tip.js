const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('tip', tipSchema);
