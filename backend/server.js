const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// تحميل المتغيرات البيئية
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // السماح للفرونت إند الخاص بك
  credentials: true,
}));
app.use(express.static('public'));

// ضبط محرك العرض لو تستخدم EJS
app.set('view engine', 'ejs');

// المسارات
app.use('/api/users', userRoutes);

// (اختياري) عرض صفحة التسجيل مباشرة عبر السيرفر
app.get('/register', (req, res) => {
  res.render('register');
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
