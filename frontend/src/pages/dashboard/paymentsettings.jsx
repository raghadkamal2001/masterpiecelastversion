

import React, { useState } from 'react';


// إدارة عمليات الدفع
function PaymentsManagement() {
    const payments = [
      { id: 1, user: 'محمد أحمد', book: 'ديوان المتنبي', amount: '75 ر.س', status: 'مكتمل', date: '22/04/2025', method: 'بطاقة ائتمان' },
      { id: 2, user: 'عمر خالد', book: 'مقدمة ابن خلدون', amount: '120 ر.س', status: 'مكتمل', date: '21/04/2025', method: 'PayPal' },
      { id: 3, user: 'سارة محمد', book: 'ألف ليلة وليلة', amount: '95 ر.س', status: 'مكتمل', date: '20/04/2025', method: 'بطاقة ائتمان' },
      { id: 4, user: 'فاطمة علي', book: 'ديوان المعلقات', amount: '65 ر.س', status: 'معلق', date: '19/04/2025', method: 'تحويل بنكي' },
      { id: 5, user: 'أحمد محمود', book: 'كليلة ودمنة', amount: '50 ر.س', status: 'فشل', date: '18/04/2025', method: 'بطاقة ائتمان' },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">إدارة عمليات الدفع</h2>
          <button
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors"
          >
            تصدير التقرير
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">إجمالي المبيعات</h3>
            <p className="text-2xl font-bold">15,480 ر.س</p>
            <div className="text-sm text-green-500 mt-2">+12.5% من الشهر السابق</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">عدد المبيعات</h3>
            <p className="text-2xl font-bold">245</p>
            <div className="text-sm text-green-500 mt-2">+8.3% من الشهر السابق</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">متوسط قيمة الطلب</h3>
            <p className="text-2xl font-bold">63.2 ر.س</p>
            <div className="text-sm text-green-500 mt-2">+3.7% من الشهر السابق</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">عمليات الدفع الفاشلة</h3>
            <p className="text-2xl font-bold">12</p>
            <div className="text-sm text-red-500 mt-2">+2.1% من الشهر السابق</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="بحث عن معاملة..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="mr-4">
                <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">جميع الحالات</option>
                  <option value="complete">مكتمل</option>
                  <option value="pending">معلق</option>
                  <option value="failed">فشل</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right">رقم المعاملة</th>
                  <th className="py-3 px-4 text-right">المستخدم</th>
                  <th className="py-3 px-4 text-right">الكتاب</th>
                  <th className="py-3 px-4 text-right">المبلغ</th>
                  <th className="py-3 px-4 text-right">طريقة الدفع</th>
                  <th className="py-3 px-4 text-right">التاريخ</th>
                  <th className="py-3 px-4 text-right">الحالة</th>
                  <th className="py-3 px-4 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#{payment.id}00{payment.id}</td>
                    <td className="py-3 px-4">{payment.user}</td>
                    <td className="py-3 px-4">{payment.book}</td>
                    <td className="py-3 px-4">{payment.amount}</td>
                    <td className="py-3 px-4">{payment.method}</td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1 text-amber-500 hover:bg-blue-100 rounded">تفاصيل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إظهار 1-5 من 245 معاملة</p>
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
 export default PaymentsManagement;