import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import axios from 'axios';

export default function LiteraryCollection() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('فشل في جلب الكتب:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  return (
    <div className="bg-gray-50 py-12 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-gray-900">مختارات</span>{" "}
            <span className="text-orange-500">أدبية</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p dir="rtl" className="text-gray-600 text-sm">
            مجموعة مختارة ومميزة من أروع الأعمال الأدبية التي تقدم نماذج من الأنماط الأدبية والقصص المتميزة
          </p>
        </div>

        {/* عرض الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
  {books.slice(0, 3).map((book, index) => (
    <div 
      key={book._id || index} 
      className="bg-white rounded shadow-sm p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-pointer"
    >
      <div className="mb-3 text-gray-800 transition-transform duration-300 group-hover:scale-110">
        <BookOpen className="w-6 h-6 transition-colors duration-300 hover:text-orange-500" />
      </div>
      <h3 dir="rtl" className="text-lg font-bold mb-2 text-gray-800 transition-colors duration-300 hover:text-orange-500">
        {book.title}
      </h3>
      <p dir="rtl" className="text-sm text-gray-600 mb-4">{book.author}</p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full text-sm transition-all duration-300 hover:px-8">
        إقرأ المزيد
      </button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
