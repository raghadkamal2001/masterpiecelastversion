

import React, { useState } from 'react';

function BooksManagement() {
    const [isAddingBook, setIsAddingBook] = useState(false);
    
    const books = [
      { id: 1, title: 'ديوان المتنبي', author: 'أبو الطيب المتنبي', price: '75 ر.س', stock: 42, sales: 354 },
      { id: 2, title: 'مقدمة ابن خلدون', author: 'ابن خلدون', price: '120 ر.س', stock: 27, sales: 287 },
      { id: 3, title: 'ألف ليلة وليلة', author: 'مؤلف مجهول', price: '95 ر.س', stock: 34, sales: 245 },
      { id: 4, title: 'ديوان المعلقات', author: 'شعراء متعددون', price: '65 ر.س', stock: 18, sales: 178 },
      { id: 5, title: 'كليلة ودمنة', author: 'ابن المقفع', price: '50 ر.س', stock: 56, sales: 132 },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">إدارة الكتب</h2>
          <button
            onClick={() => setIsAddingBook(true)}
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors"
          >
            إضافة كتاب جديد
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right">الكتاب</th>
                  <th className="py-3 px-4 text-right">المؤلف</th>
                  <th className="py-3 px-4 text-right">السعر</th>
                  <th className="py-3 px-4 text-right">المخزون</th>
                  <th className="py-3 px-4 text-right">المبيعات</th>
                  <th className="py-3 px-4 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center">
                      <div className="w-10 h-14 bg-gray-200 rounded">
                        <img src="/api/placeholder/40/56" alt="صورة الكتاب" className="w-full h-full object-cover" />
                      </div>
                      <div className="mr-3">
                        <p className="font-medium">{book.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.price}</td>
                    <td className="py-3 px-4">{book.stock}</td>
                    <td className="py-3 px-4">{book.sales}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-amber-500 hover:bg-blue-100 rounded">تعديل</button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {isAddingBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-semibold">إضافة كتاب جديد</h3>
                <button onClick={() => setIsAddingBook(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الكتاب</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل عنوان الكتاب"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المؤلف</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل اسم المؤلف"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="أدخل السعر"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">المخزون</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="أدخل كمية المخزون"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">وصف الكتاب</label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows="4"
                        placeholder="أدخل وصف الكتاب"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">صورة الكتاب</label>
                      <div className="flex items-center">
                        <div className="w-20 h-28 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500">صورة</span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          id="book-cover"
                        />
                        <label
                          htmlFor="book-cover"
                          className="mr-4 bg-gray-100 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200"
                        >
                          اختر ملفاً
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">تصنيف الكتاب</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">اختر تصنيفاً</option>
                        <option value="1">الشعر العربي</option>
                        <option value="2">الأدب العربي</option>
                        <option value="3">الفلسفة</option>
                        <option value="4">التاريخ</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 border rounded-md hover:bg-gray-100"
                      onClick={() => setIsAddingBook(false)}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-500"
                    >
                      حفظ الكتاب
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  export default BooksManagement;