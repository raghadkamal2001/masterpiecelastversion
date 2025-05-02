import React, { useState } from 'react';



function UsersManagement() {
    const users = [
      { id: 1, name: 'محمد أحمد', email: 'mohammed@example.com', role: 'مستخدم', status: 'نشط', registerDate: '15/03/2025' },
      { id: 2, name: 'سارة محمد', email: 'sara@example.com', role: 'مستخدم', status: 'نشط', registerDate: '20/03/2025' },
      { id: 3, name: 'عمر خالد', email: 'omar@example.com', role: 'مستخدم', status: 'غير نشط', registerDate: '25/03/2025' },
      { id: 4, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مسؤول', status: 'نشط', registerDate: '01/04/2025' },
      { id: 5, name: 'أحمد محمود', email: 'ahmed@example.com', role: 'مستخدم', status: 'نشط', registerDate: '05/04/2025' },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">إدارة المستخدمين</h2>
          <button
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors"
          >
            إضافة مستخدم جديد
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="بحث عن مستخدم..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="mr-4">
                <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">جميع الأدوار</option>
                  <option value="user">مستخدم</option>
                  <option value="admin">مسؤول</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right">المستخدم</th>
                  <th className="py-3 px-4 text-right">البريد الإلكتروني</th>
                  <th className="py-3 px-4 text-right">الدور</th>
                  <th className="py-3 px-4 text-right">الحالة</th>
                  <th className="py-3 px-4 text-right">تاريخ التسجيل</th>
                  <th className="py-3 px-4 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-amber-500 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="mr-3">
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'مسؤول' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.registerDate}</td>
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
              <p className="text-sm text-gray-500">إظهار 1-5 من 25 مستخدم</p>
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

  export default UsersManagement;