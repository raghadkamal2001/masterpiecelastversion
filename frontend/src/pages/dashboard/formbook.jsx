import { useState } from "react";


export default function AddBookForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    summary: "",
    characters: "",
    rhetorical: "",
    overview: "",
    questions: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
  };

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
  
      if (response.ok) {
        console.log("تم إرسال البيانات بنجاح");
        setIsSubmitted(true);
      } else {
        console.error("فشل في الإرسال");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال:", error);
    }
  };
  

  // تعريف أنواع الكتب
  const bookCategories = [
    "رواية",
    "قصة قصيرة",
    "شعر",
    "نقد أدبي",
    "سيرة ذاتية",
    "تاريخ",
    "فلسفة",
    "علوم",
    "دين",
    "أدب أطفال",
    "أخرى"
  ];

  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-8 rounded-lg shadow-md text-right max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-700">تمت إضافة الكتاب بنجاح!</h2>
        </div>
        
        <div className="bg-white p-6 rounded-md shadow-sm mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">معلومات الكتاب</h3>
          <p className="mb-2"><span className="font-bold ml-2">اسم الكتاب:</span> {bookData.title}</p>
          <p className="mb-2"><span className="font-bold ml-2">المؤلف:</span> {bookData.author}</p>
          <p className="mb-2"><span className="font-bold ml-2">النوع:</span> {bookData.category}</p>
          <p className="mb-2"><span className="font-bold ml-2">ملخص:</span> {bookData.summary}</p>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={() => {setIsSubmitted(false); setCurrentPage(1);}}
            className="bg-amber-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            إضافة كتاب آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 p-6 rounded-lg shadow-md text-right max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-amber-800 text-center">إضافة كتاب جديد</h2>
      
      {/* شريط التقدم */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className={`text-sm ${currentPage > 1 ? "text-amber-500" : "text-amber-800 font-bold"}`}>
            التفاصيل الإضافية
          </span>
          <span className={`text-sm ${currentPage === 1 ? "text-amber-800 font-bold" : "text-amber-500"}`}>
            المعلومات الأساسية
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: currentPage === 1 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>

      <div>
        {currentPage === 1 ? (
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                اسم الكتاب <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={bookData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="أدخل اسم الكتاب"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="author">
                اسم المؤلف <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={bookData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="أدخل اسم المؤلف"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                نوع الكتاب <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={bookData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>اختر نوع الكتاب</option>
                {bookCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="summary">
                ملخص الكتاب
              </label>
              <textarea
                id="summary"
                name="summary"
                value={bookData.summary}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="اكتب ملخصًا مختصرًا عن الكتاب"
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleNextPage}
                className="bg-amber-500 text-white py-2 px-6 rounded-md hover:bg-amber-600 transition-colors flex items-center"
              >
                التالي
                <svg className="h-5 w-5 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="characters">
                شرح الشخصيات
              </label>
              <textarea
                id="characters"
                name="characters"
                value={bookData.characters}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="اشرح الشخصيات الرئيسية في الكتاب"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="rhetorical">
                الأساليب البلاغية
              </label>
              <textarea
                id="rhetorical"
                name="rhetorical"
                value={bookData.rhetorical}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="اذكر الأساليب البلاغية المستخدمة في الكتاب"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="overview">
                نظرة عامة عن الكتاب
              </label>
              <textarea
                id="overview"
                name="overview"
                value={bookData.overview}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="قدم نظرة عامة عن الكتاب والقضايا التي يتناولها"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="questions">
                أسئلة أدبية مهمة
              </label>
              <textarea
                id="questions"
                name="questions"
                value={bookData.questions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="أضف بعض الأسئلة الأدبية المهمة حول الكتاب"
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
              >
                إضافة الكتاب
              </button>
              <button
                type="button"
                onClick={handlePrevPage}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors flex items-center"
              >
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                السابق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}