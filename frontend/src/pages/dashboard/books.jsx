import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // أو "next/link" في Next.js

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error('فشل في حذف الكتاب:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/books/${editBook._id}`, editBook);
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      console.error('فشل في التعديل:', err);
    }
  };

  return (
    <div className="relative p-6">
      {/* ✅ زر إضافة كتاب في الزاوية العلوية اليسرى بلون برتقالي */}
     

      <h1 className="text-2xl font-bold mb-4 text-center">قائمة الكتب</h1>
     
<div className="flex justify-left mt-8 mb-10">
  <Link
    to="/formbook"
    className="bg-orange-500 text-white px-6 py-3 rounded shadow hover:bg-orange-600 transition duration-300"
  >
    + إضافة كتاب
  </Link>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="p-4 border rounded shadow">
            {editBook && editBook._id === book._id ? (
              <>
                <input
                  value={editBook.title}
                  onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  className="w-full mb-2 p-1 border"
                />
                <input
                  value={editBook.author}
                  onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                  className="w-full mb-2 p-1 border"
                />
                <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                  حفظ
                </button>
                <button onClick={() => setEditBook(null)} className="bg-gray-400 text-white px-3 py-1 rounded">
                  إلغاء
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-700">المؤلف: {book.author}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => setEditBook(book)} className="bg-blue-500 text-white px-3 py-1 rounded">
                    تعديل
                  </button>
                  <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    حذف
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
