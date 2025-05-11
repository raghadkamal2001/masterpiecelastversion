// في ملف controllers/userController.js
const User = require('../models/User');

const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    
    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'البريد الإلكتروني مسجل بالفعل' 
      });
    }
    
    // إنشاء مستخدم جديد
    const user = await User.create({
      name,
      username,
      email,
      password
    });
    
    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'بيانات المستخدم غير صالحة' 
      });
    }
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // التحقق من وجود المستخدم
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
      });
    }
    
    // التحقق من كلمة المرور
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
      });
    }
    
    // إنشاء توكن JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'defaultsecret', // أو أي سر عندك
      { expiresIn: '30d' }
    );
    
    // إرجاع بيانات المستخدم مع التوكن
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // لا ترجع كلمة المرور
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }
    res.status(200).json({ success: true, message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { name, username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, username, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// إضافة إلى module.exports
module.exports = { registerUser, loginUser,  getAllUsers,
  deleteUser,
  updateUser};



