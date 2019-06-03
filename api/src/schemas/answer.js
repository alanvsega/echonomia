const mongoose = require('mongoose');
const userSchema = require('./user');

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('answer', answerSchema);
