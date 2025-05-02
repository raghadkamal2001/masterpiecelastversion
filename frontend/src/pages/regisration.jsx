import React, { useState } from 'react';
import axios from 'axios';

const LogupForm = () => {
  // إنشاء حالة لكل حقل من حقول النموذج
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // حالة للرسائل (نجاح/خطأ)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // استخراج البيانات من الحالة لسهولة الاستخدام
  const { name, username, email, password, confirmPassword } = formData;
  
  // تحديث الحالة عندما يتغير أي حقل
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // معالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    
    try {
      // تغيير حالة التحميل
      setIsLoading(true);
      setError('');
      
      // إرسال البيانات إلى الخادم
      const response = await axios.post('/api/users/register', {
        name,
        username,
        email,
        password
      });
      
      // معالجة الاستجابة الناجحة
      setMessage('تم إنشاء الحساب بنجاح!');
      
      // إعادة تعيين النموذج
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // توجيه المستخدم إلى صفحة تسجيل الدخول بعد 2 ثانية
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err) {
      // معالجة الخطأ
      setError(err.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 text-right">
        <h1 className="text-2xl font-bold text-white text-center mb-6">تسجيل حساب جديد</h1>
        
        {/* رسالة النجاح */}
        {message && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {message}
          </div>
        )}
        
        {/* رسالة الخطأ */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full p-3 rounded border border-orange-500 bg-gray-700 text-white text-right placeholder-gray-400" 
              placeholder="اسمك"
              required
            />
          </div>
          
          <div>
            <input 
              type="text" 
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full p-3 rounded border border-orange-500 bg-gray-700 text-white text-right placeholder-gray-400" 
              placeholder="اسم المستخدم"
              required
            />
          </div>
          
          <div>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 rounded border border-orange-500 bg-gray-700 text-white text-right placeholder-gray-400" 
              placeholder="البريد الإلكتروني"
              required
            />
          </div>
          
          <div>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 rounded border border-orange-500 bg-gray-700 text-white text-right placeholder-gray-400" 
              placeholder="كلمة المرور"
              minLength="6"
              required
            />
          </div>
          
          <div>
            <input 
              type="password" 
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded border border-orange-500 bg-gray-700 text-white text-right placeholder-gray-400" 
              placeholder="تأكيد كلمة المرور"
              minLength="6"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 mt-6 ${isLoading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold rounded transition duration-200`}
          >
            {isLoading ? 'جاري إنشاء الحساب...' : 'أنشئ حسابك'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-white">لديك حساب بالفعل؟</p>
          <a href="/login" className="text-orange-500 hover:text-orange-400">سجل دخولك</a>
        </div>
      </div>
    </div>
  );
};

export default LogupForm;