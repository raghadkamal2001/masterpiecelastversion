const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال الاسم'],
    minlength: [3, 'يجب أن يكون الاسم على الأقل 3 أحرف'],
    maxlength: [50, 'يجب ألا يتجاوز الاسم 50 حرفًا'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'الرجاء إدخال اسم المستخدم'],
    unique: true,
    minlength: [3, 'اسم المستخدم يجب أن يكون على الأقل 3 أحرف'],
    maxlength: [20, 'اسم المستخدم يجب ألا يتجاوز 20 حرفًا'],
    match: [/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام و (_) فقط'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'الرجاء إدخال البريد الإلكتروني'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'الرجاء إدخال بريد إلكتروني صحيح'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'الرجاء إدخال كلمة المرور'],
    minlength: [6, 'كلمة المرور يجب أن تكون على الأقل 6 أحرف'],
    maxlength: [1024, 'كلمة المرور طويلة جدًا'],
    match: [
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص مثل @ أو $'
],

    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'الدور يجب أن يكون admin أو user فقط'
    },
    default: 'user'
  }
});


// تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// التحقق من كلمة المرور
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;