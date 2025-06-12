const express = require('express');
const {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
  checkPaymentStatus
} = require('../controllers/paymentController');


const router = express.Router();

router.post('/payments', createPayment);
router.get('/payments', getAllPayments);
router.get('/check',checkPaymentStatus);
router.patch('/payments/:id', updatePaymentStatus); // لتحديث حالة الدفع
router.get('/book/:bookId/user/:userId', async (req, res) => {
  try {
    const payment = await Payment.findOne({
      userId: req.params.userId,
      bookId: req.params.bookId,
      status: 'accepted'
    });

    res.json({ canAccessFull: !!payment });
  } catch (err) {
    res.status(500).json({ error: 'فشل في التحقق من حالة الدفع' });
  }
});
module.exports = router;
