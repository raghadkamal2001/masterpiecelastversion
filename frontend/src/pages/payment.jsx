import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export default function Payment() {
  const [isOpen, setIsOpen] = useState(true);
  const [bookTitle, setBookTitle] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBookTitle(res.data.title);
        setPrice(res.data.price);
      } catch (err) {
        console.error('فشل في جلب بيانات الكتاب', err);
      }
    };

    fetchBook();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'اسم حامل البطاقة مطلوب';
    }
    
    // Validate card number
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'رقم البطاقة مطلوب';
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'رقم البطاقة يجب أن يكون 16 رقمًا';
    }
    
    // Validate expiration month
    if (!expMonth) {
      newErrors.expMonth = 'شهر الانتهاء مطلوب';
    } else if (expYear && parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth) {
      newErrors.expMonth = 'انتهت صلاحية البطاقة';
    }
    
    // Validate expiration year
    if (!expYear) {
      newErrors.expYear = 'سنة الانتهاء مطلوبة';
    } else if (parseInt(expYear) < currentYear) {
      newErrors.expYear = 'انتهت صلاحية البطاقة';
    }
    
    // Validate CVV
    if (!cvv.trim()) {
      newErrors.cvv = 'رمز الأمان مطلوب';
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'رمز الأمان يجب أن يكون 3 أو 4 أرقام';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    const res = await axios.post('/api/payments', {
      userId: currentUser._id, // You need to get this from your auth context
      bookId: id,
      name,
      cardNumber,
      expMonth,
      expYear,
      cvv,
      remember
    });

    Swal.fire({
      title: 'تم الدفع بنجاح!',
      text: 'انتظر موافقة المسؤول ليتم فتح كامل الكتاب',
      icon: 'success',
      confirmButtonText: 'حسنًا',
      confirmButtonColor: '#f97316',
    }).then(() => {
      setIsOpen(false);
      navigate(`/books/${id}`);
    });
  } catch (err) {
    Swal.fire({
      title: 'خطأ!',
      text: err.response?.data?.message || 'فشل في عملية الدفع',
      icon: 'error',
      confirmButtonText: 'حسنًا',
      confirmButtonColor: '#f97316',
    });
  }
};

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16);
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-1/2 p-8 rtl:text-right" dir="rtl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">الدفع</h1>

          <div className="mb-6">
            <a href="#" className="text-orange-500 hover:text-orange-600 flex items-center">
              <span>{bookTitle}</span>
              <svg className="w-5 h-5 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">المبلغ:</span>
              <span className="font-medium text-xl">{price} دينار أردني</span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-gray-700 font-medium">المبلغ المستحق:</span>
              <span className="font-bold text-2xl text-orange-500">{price} دينار أردني</span>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-orange-500"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2 text-gray-700">
              تذكر بطاقة البنك
            </label>
          </div>
        </div>

        <div className="w-1/2 bg-orange-50 p-8 border-l border-orange-100" dir="rtl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">تفاصيل البطاقة</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-2">اسم حامل البطاقة</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-600 mb-2">رقم البطاقة</label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full p-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="absolute left-3 top-3">
                    <svg width="30" height="24" viewBox="0 0 30 24">
                      <rect width="30" height="24" rx="4" fill="#FF6B00" />
                    </svg>
                  </div>
                </div>
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-600 mb-2">تاريخ الانتهاء</label>
                  <div className="flex space-x-2">
                    <select
                      className={`w-1/2 p-3 border ${errors.expMonth ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                    >
                      <option value="">شهر</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, '0');
                        return <option key={month} value={month}>{month}</option>;
                      })}
                    </select>
                    <select
                      className={`w-1/2 p-3 border ${errors.expYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                    >
                      <option value="">سنة</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                  {(errors.expMonth || errors.expYear) && (
                    <p className="text-red-500 text-sm mt-1">{errors.expMonth || errors.expYear}</p>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-600 mb-2">رمز الأمان</label>
                  <input
                    type="text"
                    className={`w-full p-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(formatCVV(e.target.value))}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-md font-medium text-lg transition-colors"
            >
              ادفع الآن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}





