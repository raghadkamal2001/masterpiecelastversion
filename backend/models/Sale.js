// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  bookTitle: String,
  userName: String,
  price: Number,
  date: Date,
});

module.exports = mongoose.model('Sale', saleSchema);
