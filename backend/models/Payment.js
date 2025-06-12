// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
  
//   name: String,
//   cardNumber: String,
//   expMonth: String,
//   expYear: String,
//   cvv: String,
//   remember: Boolean,
//   amount: Number,
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Payment', paymentSchema);

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  cardNumber: String, // ⚠️ بيانات حساسة!
  expMonth: String,
  expYear: String,
  cvv: String, // ⚠️ بيانات حساسة!
  remember: Boolean,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
