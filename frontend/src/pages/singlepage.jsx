import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';





export default function BookInterface() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('الملخص');
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasPaid, setHasPaid] = useState(false);
  const location = useLocation();
  const justPaid = location.state?.justPaid || false;

      const [userId, setUserId] = useState(null);
      const { id: bookId } = useParams();
   console.log(userId)

  const [checkingPayment, setCheckingPayment] = useState(true);

  const [showMore, setShowMore] = useState({
    الملخص: false,
    الشخصيات: false,
    الأساليب_البلاغية: false,
    استراتيجيات: false,
    اقتباسات: false,
    أسئلة_أدبية: false
  });
  const [moreQuotes, setMoreQuotes] = useState([]);



  useEffect(() => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  document.addEventListener('contextmenu', handleContextMenu);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
  };
}, []);


  // جلب بيانات الكتاب من API والتحقق من حالة الدفع
useEffect(() => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id); // هذا يُطلق useEffect آخر
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }
}, []);

// هذا useEffect يتم بعد ما يتم تعيين userId
useEffect(() => {
  const fetchBookAndCheckPayment = async () => {
    setLoading(true);
    try {
      const bookRes = await axios.get(`/api/books/${id}`, { withCredentials: true });
      setBook(bookRes.data);

      if (userId) {
        const paymentRes = await axios.get('/api/check', {
          params: {
            userId: userId,
            bookId: id
          },
          withCredentials: true
        });

        if (paymentRes.data.paid) {
          setHasPaid(true);
        }
      }
    } catch (err) {
      setError('فشل في جلب بيانات الكتاب أو التحقق من الدفع');
      console.error(err);
    } finally {
      setLoading(false);
      setCheckingPayment(false);
    }
  };

  if (userId) {
    fetchBookAndCheckPayment();
  }
}, [userId, id, justPaid]);



 const handlePaymentClick = async () => {

   if (hasPaid) {
    // لا تفعل شيء إذا كان المستخدم قد دفع
    return;
  }

  const token = Cookies.get('token');

  if (!userId) {
    await Swal.fire({
      icon: 'warning',
      title: 'تنبيه',
      text: 'يجب تسجيل الدخول أولاً',
      confirmButtonText: 'حسنًا'
    });
    return;
  }



  
  const confirmPayment = await Swal.fire({
    title: 'الاشتراك في qaseed PLUS',
    text: 'للوصول إلى المحتوى الكامل، يرجى الاشتراك في qaseed PLUS. هل تريد المتابعة إلى صفحة الدفع؟',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا'
  });

  if (confirmPayment.isConfirmed) {
    navigate(`/payment/${id}`);
  }
};




const handleShowMoreClick = (tabKey) => {
  // إذا المستخدم لم يدفع، اطلب منه الدفع أولًا
  if (!hasPaid) {
    handlePaymentClick();
    return; // لا تفتح المحتوى الإضافي إلا بعد الدفع
  }

  // إذا دفع المستخدم، تأكد من فتح المحتوى الإضافي للتاب المحدد
  setShowMore(prevState => ({
    ...prevState,
    [tabKey]: true, // افتح المحتوى الإضافي بدلاً من تبديله
  }));
};


  if (loading || checkingPayment) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>الكتاب غير موجود</p>
      </div>
    );
  }

  // تحويل النصوص المخزنة كسلسلة إلى مصفوفات عند الحاجة
  const chapters = book.summary
    ? book.summary.split('\n\n').map((summary, index) => ({
        id: index + 1,
        title: `الفصل ${index + 1}`,
        summary: summary,
        notes: []
      }))
    : [];

  const quotes = book.quotes || [];
  const characters = book.characters ? book.characters.split('\n') : [];
  const rhetorical = book.rhetorical ? book.rhetorical.split('\n') : [];
  const strategies = book.overview ? book.overview.split('\n') : [];
  const articles = book.questions ? book.questions.split('\n') : [];

  // دالة لعرض جزء من المحتوى مع زر عرض المزيد
  const renderContentWithShowMore = (content, tabKey, itemsToShow = 3) => {
    const contentArray = Array.isArray(content) ? content : [content];
    const shouldShowMore = contentArray.length > itemsToShow;
    const displayContent = showMore[tabKey] ? contentArray : contentArray.slice(0, itemsToShow);

    return (
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold mb-4">{tabKey.replace('_', ' ')}</h2>
        <ul className="list-disc pr-8">
          {displayContent.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
        {shouldShowMore && (
          <button
            onClick={() => handleShowMoreClick(tabKey)}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium mt-2"
          >
            {showMore[tabKey] ? 'عرض أقل' : 'عرض المزيد'}
          </button>
        )}
      </div>
    );
  };

  // محتوى التبويبات
  const tabs = {
    الملخص: (
      <div className="mt-8">
        {chapters.slice(0, showMore['الملخص'] ? chapters.length : 3).map((chapter) => (
          <div key={chapter.id} className="mb-12">
            <h2 className="text-xl font-bold text-right mb-4">{`${book.title} | ${chapter.title}`}</h2>
            <div className="flex flex-row-reverse">
              <div className="w-3/4 px-4 text-right">
                <h3 className="font-bold mb-4">الملخص</h3>
                <p className="text-right leading-relaxed">{chapter.summary}</p>
              </div>
            </div>
          </div>
        ))}
        {chapters.length > 3 && (
          <button
            onClick={() => handleShowMoreClick('الملخص')}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium mt-2"
          >
            {showMore['الملخص'] ? 'عرض فصول أقل' : 'عرض جميع الفصول'}
          </button>
        )}
      </div>
    ),
    الشخصيات: renderContentWithShowMore(characters, 'الشخصيات'),
    الأساليب_البلاغية: renderContentWithShowMore(rhetorical, 'الأساليب_البلاغية'),
    استراتيجيات: renderContentWithShowMore(strategies, 'استراتيجيات'),
    اقتباسات: renderContentWithShowMore(quotes, 'اقتباسات'),
    أسئلة_أدبية: renderContentWithShowMore(articles, 'أسئلة_أدبية')
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-slate-700 text-white p-20">
        <div className="container mx-auto flex flex-col items-end">
          <h1 className="text-3xl font-bold mb-5">{book.title}</h1>
          <p className="text-lg">{book.author}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto flex flex-row-reverse overflow-x-auto">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'font-bold border-b-2 border-orange-500 text-amber-500'
                  : 'text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="container mx-auto py-8 px-4">
        {/* Search Bar */}
        <div className="max-w-md ml-auto mb-8 relative">
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-full p-3 border rounded-lg text-right pr-12"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <svg
            className="w-6 h-6 absolute right-3 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Main Content Area - takes 2/3 of space */}
          <div className="lg:w-2/3">{tabs[activeTab]}</div>

          {/* Notes Section - takes 1/3 of space */}
          <div className="lg:w-1/3">
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm sticky top-4">
              {/* Header */}
              <div className="flex flex-row-reverse justify-between p-4 bg-gray-50 border-b">
                <h3 className="font-bold text-gray-800">الملاحظات</h3>
                <button
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => setShowAllNotes(!showAllNotes)}
                >
                  {showAllNotes ? 'عرض أقل' : 'عرض جميع الملاحظات'}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {!showAllNotes ? (
                  <>
                    {/* Add Note Button */}
                    <button
                      className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      onClick={handlePaymentClick}
                    >
                      + إضافة ملاحظة مع qaseed PLUS
                    </button>

                    {/* Placeholder text */}
                    <div className="text-center mt-4 text-gray-500 text-sm">
                      اكتب أفكارك هنا!
                    </div>
                  </>
                ) : (
                  // This would show existing notes if there were any
                  <div className="text-center py-4 text-gray-500">
                    لم تقم بإضافة أي ملاحظات بعد
                  </div>
                )}
              </div>

              {/* Footer with book activation message */}
              <div className="flex justify-center items-center mt-2 mb-4 text-yellow-500">
                <span className="ml-2">💡</span>
                <button onClick={handlePaymentClick} className="hover:underline">
                  تفعيل كامل للكتاب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* اقتباسات الكتاب */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto my-6">
        <div className="flex justify-center mb-6">
          <div className="text-4xl text-orange-500">❝</div>
        </div>

        <div className="space-y-6 text-right">
          {quotes.map((quote, index) => (
            <p key={index} className="text-xl font-medium text-gray-800 leading-relaxed rtl">
              "{quote}"
            </p>
          ))}

          {showMore &&
            moreQuotes.map((quote, index) => (
              <p key={index} className="text-xl font-medium text-gray-800 leading-relaxed rtl">
                "{quote}"
              </p>
            ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (!hasPaid) {
                handlePaymentClick();
                return;
              }
              setShowMore(!showMore);
            }}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            {showMore ? 'عرض أقل' : 'اضغط هنا لرؤية المزيد من اقتباسات هذا العمل الأدبي'}
          </button>
        </div>
      </div>
    </div>
  );
}