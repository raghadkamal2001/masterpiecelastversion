// const Payment = require('../models/Payment');

// // إنشاء عملية دفع جديدة
// const createPayment = async (req, res) => {
//   try {
//     const payment = new Payment(req.body);
//     await payment.save();
//     res.status(201).json({ message: 'تم حفظ الدفع بنجاح', payment });
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في حفظ البيانات', details: err.message });
//   }
// };

// // جلب كل عمليات الدفع
// const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().sort({ createdAt: -1 });
//     res.status(200).json(payments);
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في جلب البيانات' });
//   }
// };

// // تحديث حالة الدفع (مقبول أو مرفوض)
// const updatePaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updated = await Payment.findByIdAndUpdate(id, { status }, { new: true });

//     if (!updated) return res.status(404).json({ error: 'لم يتم العثور على الدفع' });

//     res.status(200).json({ message: 'تم التحديث بنجاح', payment: updated });
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في التحديث', details: err.message });
//   }
// };

// module.exports = {
//   createPayment,
//   getAllPayments,
//   updatePaymentStatus
// };



const Payment = require('../models/Payment');

// إنشاء عملية دفع جديدة
// controllers/paymentController.js
const createPayment = async (req, res) => {
  try {
    const { userId, bookId, name, cardNumber, expMonth, expYear, cvv, remember } = req.body;

    // First, fetch the book details
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const existing = await Payment.findOne({ userId, bookId });
    if (existing) return res.status(400).json({ message: 'Payment already exists' });

    const payment = new Payment({
      userId,
      bookId,
      bookTitle: book.title,
      amount: book.price,
      name,
      cardNumber, // Note: In production, you should NEVER store raw card numbers
      expMonth,
      expYear,
      cvv,       // Note: In production, you should NEVER store raw CVV
      remember,
      status: 'pending'
    });
    
    await payment.save();

    res.status(201).json({ message: 'Payment request sent, waiting for admin approval' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
};

const approvePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: 'لم يتم العثور على الدفع' });

    payment.isApproved = true;
    await payment.save();

    res.json({ message: 'تمت الموافقة على الدفع' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الموافقة' });
  }
};



const checkPaymentStatus = async (req, res) => {
  const { userId, bookId } = req.query;

  if (!userId || !bookId) {
    return res.status(400).json({ success: false, message: 'userId و bookId مطلوبان' });
  }

  try {
    const payment = await Payment.findOne({
      userId,
      bookId,
      status: 'paid'
    });

    if (payment) {
      return res.status(200).json({ success: true, paid: true });
    } else {
      return res.status(200).json({ success: true, paid: false });
    }
  } catch (err) {
    console.error('Error checking payment:', err);
    return res.status(500).json({ success: false, message: 'خطأ في الخادم الداخلي' });
  }
};




// جلب كل عمليات الدفع
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: 'فشل في جلب البيانات' });
  }
};

// تحديث حالة الدفع (مقبول أو مرفوض)
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Payment.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) return res.status(404).json({ error: 'لم يتم العثور على الدفع' });

    res.status(200).json({ message: 'تم التحديث بنجاح', payment: updated });
  } catch (err) {
    res.status(500).json({ error: 'فشل في التحديث', details: err.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
  approvePayment,
  checkPaymentStatus
};

