import React, { useState } from 'react';
import { BookOpen, Users, CreditCard } from 'lucide-react';



function DashboardContent() {
  const stats = [
    { title: 'إجمالي الكتب', value: '1,254', change: '+12%', icon: <BookOpen size={20} /> },
    { title: 'إجمالي المستخدمين', value: '3,872', change: '+8%', icon: <Users size={20} /> },
    { title: 'إجمالي الاقتباسات', value: '12,540', change: '+15%', icon: <BookOpen size={20} /> },
    { title: 'إجمالي الإيرادات', value: '54,872 ر.س', change: '+25%', icon: <CreditCard size={20} /> },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <div className="p-2 bg-blue-100 rounded-full text-amber-500">{stat.icon}</div>
            </div>
            <div className="flex items-end">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className="text-sm text-green-500 ml-2">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">أحدث المبيعات</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right">الكتاب</th>
                  <th className="py-2 text-right">المستخدم</th>
                  <th className="py-2 text-right">السعر</th>
                  <th className="py-2 text-right">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">ديوان المتنبي</td>
                  <td className="py-2">محمد أحمد</td>
                  <td className="py-2">75 ر.س</td>
                  <td className="py-2">22/04/2025</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">مقدمة ابن خلدون</td>
                  <td className="py-2">عمر خالد</td>
                  <td className="py-2">120 ر.س</td>
                  <td className="py-2">21/04/2025</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">ألف ليلة وليلة</td>
                  <td className="py-2">سارة محمد</td>
                  <td className="py-2">95 ر.س</td>
                  <td className="py-2">20/04/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">أكثر الكتب مبيعاً</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-16 bg-gray-200 rounded">
                <img src="/api/placeholder/48/64" alt="صورة الكتاب" className="w-full h-full object-cover" />
              </div>
              <div className="mr-4 flex-1">
                <h4 className="font-medium">ديوان المتنبي</h4>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm">354 مبيعة</p>
                  <p className="font-semibold">75 ر.س</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-16 bg-gray-200 rounded">
                <img src="/api/placeholder/48/64" alt="صورة الكتاب" className="w-full h-full object-cover" />
              </div>
              <div className="mr-4 flex-1">
                <h4 className="font-medium">مقدمة ابن خلدون</h4>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm">287 مبيعة</p>
                  <p className="font-semibold">120 ر.س</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-16 bg-gray-200 rounded">
                <img src="/api/placeholder/48/64" alt="صورة الكتاب" className="w-full h-full object-cover" />
              </div>
              <div className="mr-4 flex-1">
                <h4 className="font-medium">ألف ليلة وليلة</h4>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-sm">245 مبيعة</p>
                  <p className="font-semibold">95 ر.س</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;