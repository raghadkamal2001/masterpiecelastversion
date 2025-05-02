import React, { useState } from 'react';

function AuthorsManagement() {
    const authors = [
      { id: 1, name: 'أبو الطيب المتنبي', era: 'العصر العباسي', country: 'العراق', works: 8, image: '/api/placeholder/40/40' },
      { id: 2, name: 'ابن خلدون', era: 'العصر المملوكي', country: 'تونس', works: 5, image: '/api/placeholder/40/40' },
      { id: 3, name: 'أبو القاسم الشابي', era: 'العصر الحديث', country: 'تونس', works: 3, image: '/api/placeholder/40/40' },
      { id: 4, name: 'نزار قباني', era: 'العصر الحديث', country: 'سوريا', works: 12, image: '/api/placeholder/40/40' },
      { id: 5, name: 'محمود درويش', era: 'العصر الحديث', country: 'فلسطين', works: 10, image: '/api/placeholder/40/40' },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">إدارة الأدباء والشعراء</h2>
          <button
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors"
          >
            إضافة أديب جديد
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="بحث عن أديب أو شاعر..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="mr-4">
                <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">جميع العصور</option>
                  <option value="classic">العصر الجاهلي</option>
                  <option value="islamic">العصر الإسلامي</option>
                  <option value="abbasid">العصر العباسي</option>
                  <option value="modern">العصر الحديث</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right">الأديب</th>
                  <th className="py-3 px-4 text-right">العصر</th>
                  <th className="py-3 px-4 text-right">البلد</th>
                  <th className="py-3 px-4 text-right">عدد الأعمال</th>
                  <th className="py-3 px-4 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200">
                        <img src={author.image} alt={author.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="mr-3">
                        <p className="font-medium">{author.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{author.era}</td>
                    <td className="py-3 px-4">{author.country}</td>
                    <td className="py-3 px-4">{author.works}</td>
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
          
          <div className="p-4 border-t flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إظهار 1-5 من 30 أديب</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border rounded hover:bg-gray-50">السابق</button>
              <button className="p-2 bg-amber-500 text-white rounded">1</button>
              <button className="p-2 border rounded hover:bg-gray-50">2</button>
              <button className="p-2 border rounded hover:bg-gray-50">3</button>
              <button className="p-2 border rounded hover:bg-gray-50">التالي</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
 export default  AuthorsManagement;