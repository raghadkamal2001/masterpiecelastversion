import React, { useState } from 'react';


function QuotesManagement() {
    const quotes = [
      { id: 1, quote: 'كأنك تراني كأني لا أراك', book: 'ديوان المتنبي', author: 'أبو الطيب المتنبي', likes: 124 },
      { id: 2, quote: 'الإنسان مدني بالطبع', book: 'مقدمة ابن خلدون', author: 'ابن خلدون', likes: 87 },
      { id: 3, quote: 'العلم في الصغر كالنقش على الحجر', book: 'حكم وأمثال', author: 'مثل عربي', likes: 65 },
      { id: 4, quote: 'من جد وجد، ومن زرع حصد', book: 'حكم وأمثال', author: 'مثل عربي', likes: 54 },
      { id: 5, quote: 'كل إناء بما فيه ينضح', book: 'حكم وأمثال', author: 'مثل عربي', likes: 42 },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">إدارة الاقتباسات</h2>
          <button
           className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition-colors"
           >
             إضافة اقتباس جديد
           </button>
         </div>
         
         <div className="bg-white rounded-lg shadow-md overflow-hidden">
           <div className="p-4 border-b">
             <div className="flex items-center">
               <div className="flex-1">
                 <input
                   type="text"
                   placeholder="بحث عن اقتباس..."
                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                 />
               </div>
               <div className="mr-4">
                 <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                   <option value="">جميع الكتب</option>
                   <option value="1">ديوان المتنبي</option>
                   <option value="2">مقدمة ابن خلدون</option>
                   <option value="3">حكم وأمثال</option>
                 </select>
               </div>
             </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead className="bg-gray-50">
                 <tr>
                   <th className="py-3 px-4 text-right">الاقتباس</th>
                   <th className="py-3 px-4 text-right">الكتاب</th>
                   <th className="py-3 px-4 text-right">المؤلف</th>
                   <th className="py-3 px-4 text-right">الإعجابات</th>
                   <th className="py-3 px-4 text-right">الإجراءات</th>
                 </tr>
               </thead>
               <tbody>
                 {quotes.map((quote) => (
                   <tr key={quote.id} className="border-b hover:bg-gray-50">
                     <td className="py-3 px-4">
                       <p className="font-medium">{quote.quote}</p>
                     </td>
                     <td className="py-3 px-4">{quote.book}</td>
                     <td className="py-3 px-4">{quote.author}</td>
                     <td className="py-3 px-4">{quote.likes}</td>
                     <td className="py-3 px-4">
                       <div className="flex items-center space-x-2">
                         <button className="p-1 text--amber-500 hover:bg-blue-100 rounded">تعديل</button>
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
               <p className="text-sm text-gray-500">إظهار 1-5 من 42 اقتباس</p>
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
 export default QuotesManagement;