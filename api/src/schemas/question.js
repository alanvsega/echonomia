const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  alternatives: Array
});

module.exports = mongoose.model('question', questionSchema);
