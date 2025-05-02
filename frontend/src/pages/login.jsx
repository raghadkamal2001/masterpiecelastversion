import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  // إنشاء حالة لبيانات تسجيل الدخول
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // حالة للرسائل (نجاح/خطأ)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // استخراج البيانات من الحالة لسهولة الاستخدام
  const { email, password } = formData;
  
  // تحديث الحالة عندما يتغير أي حقل
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // معالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // تغيير حالة التحميل
      setIsLoading(true);
      setError('');
      
      // إرسال البيانات إلى الخادم
      // ملاحظة: استخدم URL كامل للخادم في بيئة الإنتاج أو قم بإعداد بروكسي
      const response = await axios.post('/api/users/login', {
        email,
        password
      });
      
      // معالجة الاستجابة الناجحة
      setMessage('تم تسجيل الدخول بنجاح!');
      
      // حفظ معلومات المستخدم في التخزين المحلي
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // توجيه المستخدم إلى الصفحة الرئيسية بعد ثانية واحدة
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
      
    } catch (err) {
      // معالجة الخطأ
      setError(err.response?.data?.message || 'خطأ في اسم المستخدم أو كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 text-right">
        <h1 className="text-2xl font-bold text-white text-center mb-6">سجل دخولك</h1>
        
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
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 mt-6 ${isLoading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold rounded transition duration-200`}
          >
            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-orange-500 hover:text-orange-400 block mb-2">هل نسيت كلمة المرور؟</a>
          <p className="text-white">ليس لديك حساب؟</p>
          <a href="/registration" className="text-orange-500 hover:text-orange-400">أنشئ حساب &lt;&lt;</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;