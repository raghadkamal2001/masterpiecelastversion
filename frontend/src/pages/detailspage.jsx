import React, { useEffect, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['كل الأقسام']); // الفئات المبدئية
  const [selectedCategory, setSelectedCategory] = useState('كل الأقسام');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
 
  // جلب الفئات (اختياري - حسب ما إذا كنت تجلب من API حقيقي)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(['كل الأقسام', ...res.data]);
      } catch (err) {
        console.warn('فشل جلب الفئات، سيتم استخدام فئات مبدئية');
        // استخدام فئات افتراضية عند الفشل
        setCategories(['كل الأقسام', 'الشعر', 'النثر', 'الرواية', 'القصة القصيرة']);
      }
    };
    fetchCategories();
  }, []);

  // جلب الكتب
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/books', {
        params: {
          category: selectedCategory !== 'كل الأقسام' ? selectedCategory : '',
          search: searchQuery
        }
      });
      setBooks(res.data);
    } catch (err) {
      setError('فشل في جلب الكتب');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-700 to-gray-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">قصيد</h1>
          <p className="text-xl max-w-2xl mx-auto">
            تحليلات وشروحات تعمّق فهمك لأعظم الأعمال الأدبية من قصيد ونثر وروايات
          </p>

          {/* شريط البحث */}
          <div className="max-w-2xl mx-auto mt-8 relative">
            <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="ابحث عن كتاب أو مؤلف..."
                className="flex-grow py-4 px-6 text-gray-800 text-right outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-gray-700 px-6 flex items-center justify-center">
                <Search className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* فلاتر الفئات */}
      <div className="container mx-auto px-4 -mt-1" dir="rtl">
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {categories.map((categoryName, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(categoryName)}
              className={`px-8 py-3 rounded-full border-2 ${
                selectedCategory === categoryName
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              } transition-colors duration-200 font-medium text-lg`}
            >
              {categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* حالة التحميل والخطأ */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          <p className="mt-2">جاري التحميل...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* كروت الكتب */}
      {!loading && !error && <ArabicLiteraryCards books={books} />}
    </div>
  );
}

// مكوّن عرض كروت الكتب
function ArabicLiteraryCards({ books }) {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/books/${id}`); // نوجه المستخدم إلى صفحة الكتاب باستخدام المعرف الحقيقي
      };
      
  
    
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">لا توجد كتب متاحة</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <div
          key={book._id || index}
          className="bg-white rounded shadow-sm p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer"
        >
          <div className="mb-3 text-gray-800 transition-transform duration-300 group-hover:scale-110">
            <BookOpen className="w-6 h-6 transition-colors duration-300 hover:text-orange-500" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 transition-colors duration-300 hover:text-orange-500">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{book.author}</p>
          <span className="text-xs text-gray-400 mb-4">{book.category}</span>
          <button
  onClick={() => handleClick(book._id)}
  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full text-sm transition-all duration-300 hover:px-8"
>
  إقرأ المزيد
</button>
        </div>
      ))}
    </div>
  </div>
  );
}
