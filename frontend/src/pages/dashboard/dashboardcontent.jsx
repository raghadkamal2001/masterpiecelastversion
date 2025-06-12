// import React, { useState, useEffect } from 'react';
// import { BookOpen, Users, CreditCard } from 'lucide-react';
// import axios from 'axios';

// function DashboardContent() {
//   const [stats, setStats] = useState([]);
//   const [latestSales, setLatestSales] = useState([]);
//   const [topBooks, setTopBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // جلب البيانات من API
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [statsRes, salesRes, topBooksRes] = await Promise.all([
//           axios.get('/api/dashboard/stats'),
//           axios.get('/api/dashboard/latest-sales'),
//           axios.get('/api/dashboard/top-books'),
//         ]);
//         setStats(statsRes.data);
//         setLatestSales(salesRes.data);
//         setTopBooks(topBooksRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError('فشل تحميل البيانات');
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // أيقونات حسب الاسم
//   const iconsMap = {
//     BookOpen: <BookOpen size={20} />,
//     Users: <Users size={20} />,
//     CreditCard: <CreditCard size={20} />,
//   };

//   if (loading) return <p>جارٍ التحميل...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       {/* الإحصائيات */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-gray-500 text-sm">{stat.title}</h3>
//               <div className="p-2 bg-blue-100 rounded-full text-amber-500">
//                 {iconsMap[stat.icon]}
//               </div>
//             </div>
//             <div className="flex items-end">
//               <p className="text-2xl font-bold">{stat.value}</p>
//               <span className="text-sm text-green-500 ml-2">{stat.change}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* أحدث المبيعات */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">أحدث المبيعات</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="py-2 text-right">الكتاب</th>
//                   <th className="py-2 text-right">المستخدم</th>
//                   <th className="py-2 text-right">السعر</th>
//                   <th className="py-2 text-right">التاريخ</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {latestSales.map((sale, i) => (
//                   <tr key={i} className="border-b hover:bg-gray-50">
//                     <td className="py-2">{sale.book?.title || 'غير معروف'}</td>
//                     <td className="py-2">{sale.user?.name || 'غير معروف'}</td>
//                     <td className="py-2">{sale.amount} دينار أردني</td>
//                     <td className="py-2">{new Date(sale.createdAt).toLocaleDateString('ar-EG')}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* أكثر الكتب مبيعاً */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">أكثر الكتب مبيعاً</h3>
//           <div className="space-y-4">
//             {topBooks.map((book, i) => (
//               <div key={i} className="flex items-center">
//                 <div className="mr-4 flex-1">
//                   <h4 className="font-medium">{book.title}</h4>
//                   <div className="flex items-center justify-between">
//                     <p className="text-gray-500 text-sm">{book.sales} مبيعة</p>
//                     <p className="font-semibold">{book.price} دينار أردني</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardContent;


import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardContent() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("http://localhost:5000/api/dashboard/stats");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>جاري التحميل...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">إحصائيات الموقع</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="text-lg text-gray-600">عدد المستخدمين</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="text-lg text-gray-600">عدد الكتب</h3>
          <p className="text-3xl font-bold text-green-500">{stats.totalBooks}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="text-lg text-gray-600">عدد عمليات الدفع</h3>
          <p className="text-3xl font-bold text-orange-500">{stats.totalPayments}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">إجمالي الدفع الشهري</h3>
      <ResponsiveContainer width="100%" height={300}>
       <BarChart data={stats.monthlyPayments}>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="total" fill="#f97316" />
</BarChart>

      </ResponsiveContainer>
    </div>
  );
}

