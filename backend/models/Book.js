const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: String,
  summary: String,
  characters: String,
  rhetorical: String,
  overview: String,
  questions: String
}, { timestamps: true });

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
