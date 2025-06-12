// // controllers/dashboardController.js
// const Sale = require('../models/Sale');
// const Book = require('../models/Book');
// const User = require('../models/User'); 
// const Payment = require('../models/Payment');


// exports.getStats = async (req, res) => {
//   const totalBooks = await Book.countDocuments();
//   const totalUsers = await User.countDocuments();
//   const totalSales = await Sale.countDocuments();
//   const totalRevenue = await Sale.aggregate([
//     { $group: { _id: null, total: { $sum: '$price' } } },
//   ]);

//   res.json([
//     { title: 'إجمالي الكتب', value: totalBooks.toString(), change: '+12%', icon: 'BookOpen' },
//     { title: 'إجمالي المستخدمين', value: totalUsers.toString(), change: '+8%', icon: 'Users' },
//     { title: 'إجمالي الاقتباسات', value: totalSales.toString(), change: '+15%', icon: 'BookOpen' },
//     { title: 'إجمالي الإيرادات', value: `${totalRevenue[0]?.total || 0} ر.س`, change: '+25%', icon: 'CreditCard' },
//   ]);
// };

// exports.getLatestSales = async (req, res) => {
//   const sales = await Sale.find().sort({ date: -1 }).limit(5);
//   res.json(sales);
// };

// exports.getTopBooks = async (req, res) => {
//   const books = await Book.find().sort({ sales: -1 }).limit(5);
//   res.json(books);
// };


// exports. getTotalSales = async (req, res) => {
//   try {
//     const paidSales = await Payment.aggregate([
//       { $match: { status: 'paid' } },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$amount" }
//         }
//       }
//     ]);

//     res.json({ totalSales: paidSales[0]?.total || 0 });
//   } catch (err) {
//     res.status(500).json({ message: 'خطأ في جلب إجمالي المبيعات' });
//   }
// };




// controllers/dashboardController.js
const User = require('../models/User');
const Book = require('../models/Book');
const Payment = require('../models/Payment');

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalPayments = await Payment.countDocuments();

    // مثال: إجمالي الدفع شهريًا (لرسم بياني)
    const monthlyPaymentsRaw = await Payment.aggregate([
  {
    $group: {
      _id: { $month: "$createdAt" },
      total: { $sum: "$amount" }
    }
  },
]);

// نجهز مصفوفة لكل الشهور
const monthlyPayments = Array.from({ length: 12 }, (_, i) => {
  const monthData = monthlyPaymentsRaw.find(item => item._id === i + 1);
  return {
    month: `شهر ${i + 1}`,
    total: monthData ? monthData.total : 0
  };
});


   res.status(200).json({
  totalUsers,
  totalBooks,
  totalPayments,
  monthlyPayments
});

  } catch (err) {
    res.status(500).json({ message: 'فشل جلب الإحصائيات' });
  }
};
