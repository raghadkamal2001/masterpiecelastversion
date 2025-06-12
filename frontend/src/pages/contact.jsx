import { useState } from 'react';
import { BookOpen, Clock, Phone } from 'lucide-react';
import axios from "axios";
import Swal from 'sweetalert2';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/messages', formData);

    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال',
        text: 'تم إرسال الرسالة بنجاح!',
        confirmButtonColor: '#F28123' // لون الزر برتقالي
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء الإرسال',
        confirmButtonColor: '#F28123'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'استثناء',
      text: 'حدث خطأ أثناء محاولة إرسال الرسالة.',
      confirmButtonColor: '#F28123'
    });
    console.error(error);
  }
};



  return (
    <div className="font-sans" dir="rtl">
      {/* قسم العنوان والاتصال */}
      <div className="bg-slate-700 text-white p-20 text-center py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-orange-400 mb-2">دائماً هنا من أجلك</p>
          <h1 className="text-4xl font-bold mb-16">اتصل بنا</h1>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row">
        {/* نموذج الاتصال */}
        <div className="w-full md:w-2/3 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">هل لديك أي استفسار؟</h2>
          <p className="text-slate-600 mb-8">
إذا كانت لديك أي تساؤلات حول أعمالنا الأدبية أو كنت ترغب في مناقشة فكرة أدبية، نحن هنا للاستماع إليك. لا تتردد في التواصل معنا          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
              />
              <input
                type="text"
                name="subject"
                placeholder="الموضوع"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded"
              />
            </div>
            
            <textarea
              name="message"
              placeholder="رسالتك"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-300 p-3 rounded"
            ></textarea>
            
            <div className="text-center md:text-right">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>

        {/* معلومات الاتصال */}
        <div className="w-full md:w-1/3 mt-12 md:mt-0">
  <div className="bg-white p-6 rounded shadow-sm font-sans" dir="rtl">
    <div className="space-y-8">
      {/* العنوان */}
      <div className="flex items-start">
        <div className="ml-4">
          <BookOpen size={24} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">العنوان</h3>
          <div className="text-gray-600 space-y-1">
            <p>حي الأدب ،8/34</p>
            <p>المدينة الفاضلة، 12345</p>
            <p>اسم البلد</p>
          </div>
        </div>
      </div>

      {/* ساعات العمل */}
      <div className="flex items-start">
        <div className="ml-4">
          <Clock size={24} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">ساعات العمل</h3>
          <div className="text-gray-600 space-y-1">
            <p>من الإثنين إلى الجمعة: 9 صباحاً إلى 6 مساءً</p>
            <p>السبت والأحد: 10 صباحاً إلى 5 مساءً</p>
          </div>
        </div>
      </div>

      {/* التواصل */}
      <div className="flex items-start">
        <div className="ml-4">
          <Phone size={24} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">التواصل</h3>
          <div className="text-gray-600 space-y-1">
            <p>الهاتف: +00 111 222 3333</p>
            <p>البريد الإلكتروني: support@qaseed.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}