// import { useState, useEffect } from 'react';
// import { User, BookOpen, Heart, GraduationCap, Mail, BookMarked, FileText } from 'lucide-react';

// // هذه دوال محاكاة لجلب البيانات - استبدلها بمكالمات API الفعلية
// const getUserData = async () => {
//   return {
//     name: "أحمد محمود",
//     email: "ahmed@example.com",
//     role: "طالب",
//     specialty: "هندسة البرمجيات",
//     qualification: "بكالوريوس",
//     avatar: "/api/placeholder/120/120"
//   };
// };

// const getFavoriteBooks = async () => {
//   return [
//     { id: 1, title: "أساسيات React", author: "محمد علي", category: "تقنية" },
//     { id: 2, title: "تعلم MongoDB", author: "سارة أحمد", category: "قواعد بيانات" },
//     { id: 3, title: "برمجة الويب المتقدمة", author: "خالد وليد", category: "تطوير الويب" }
//   ];
// };

// const getPoemBooks = async () => {
//   return [
//     { id: 1, title: "نبض الحياة", author: "محمود درويش", year: "2010" },
//     { id: 2, title: "أوراق الخريف", author: "نزار قباني", year: "2005" }
//   ];
// };

// export default function UserProfile() {
//   const [userData, setUserData] = useState(null);
//   const [favoriteBooks, setFavoriteBooks] = useState([]);
//   const [poemBooks, setPoemBooks] = useState([]);
//   const [activeTab, setActiveTab] = useState('profile');
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const user = await getUserData();
//       setUserData(user);
      
//       const favorites = await getFavoriteBooks();
//       setFavoriteBooks(favorites);
      
//       const poems = await getPoemBooks();
//       setPoemBooks(poems);
//     };
    
//     fetchData();
//   }, []);
  
//   if (!userData) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-white">
//         <div className="text-orange-500 text-lg">جاري تحميل البيانات...</div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-50" dir="rtl">
//       <div className="mx-auto max-w-6xl px-4 py-8">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* القسم الجانبي - معلومات المستخدم */}
//           <div className="md:w-1/3">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {/* رأس الملف الشخصي مع الألوان البرتقالية */}
//               <div className="bg-white h-24 relative">

//                 <div className="absolute -bottom-12 right-6">
//                   <div className="relative">
//                   <div className="border-4 border-orange-500 p-1 rounded-full">

//                       <img 
//                         src={userData.avatar}
//                         alt="صورة المستخدم"
//                         className="w-24 h-24 rounded-full"
//                       />
//                     </div>
//                     {userData.role === "مدرس" ? (
//                       <div className="absolute top-0 left-0 bg-blue-500 p-1 rounded-full">
//                         <GraduationCap size={16} className="text-white" />
//                       </div>
//                     ) : (
//                       <div className="absolute top-0 left-0 bg-green-500 p-1 rounded-full">
//                         <User size={16} className="text-white" />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* بيانات المستخدم */}
//               <div className="pt-16 pb-6 px-6">
//                 <h2 className="text-2xl font-bold text-black">{userData.name}</h2>
//                 <div className="flex items-center mt-1 text-gray-700">
//                   <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
//                     {userData.role}
//                   </div>
//                 </div>
                
//                 <div className="mt-6 space-y-4">
//                   <div className="flex items-start space-x-3 space-x-reverse">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                       <GraduationCap size={20} className="text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">التخصص والمؤهل العلمي</h3>
//                       <p className="text-black">{userData.specialty} - {userData.qualification}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3 space-x-reverse">
//                     <div className="bg-orange-100 p-2 rounded-lg">
//                       <Mail size={20} className="text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
//                       <p className="text-black">{userData.email}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-8">
//                   <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
//                     <User size={16} className="ml-2" />
//                     تعديل الملف الشخصي
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* القسم الأساسي - التبويبات */}
//           <div className="md:w-2/3">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {/* شريط التبويبات */}
//               <div className="flex border-b border-gray-200">
//                 <button
//                   onClick={() => setActiveTab('profile')}
//                   className={`flex items-center justify-center px-6 py-3 text-sm font-medium flex-1 ${
//                     activeTab === 'profile' 
//                       ? 'text-orange-500 border-b-2 border-orange-500' 
//                       : 'text-gray-600 hover:text-orange-500'
//                   }`}
//                 >
//                   <User size={18} className="ml-2" />
//                   الملف الشخصي
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('favorites')}
//                   className={`flex items-center justify-center px-6 py-3 text-sm font-medium flex-1 ${
//                     activeTab === 'favorites' 
//                       ? 'text-orange-500 border-b-2 border-orange-500' 
//                       : 'text-gray-600 hover:text-orange-500'
//                   }`}
//                 >
//                   <Heart size={18} className="ml-2" />
//                   الكتب المفضلة
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('poems')}
//                   className={`flex items-center justify-center px-6 py-3 text-sm font-medium flex-1 ${
//                     activeTab === 'poems' 
//                       ? 'text-orange-500 border-b-2 border-orange-500' 
//                       : 'text-gray-600 hover:text-orange-500'
//                   }`}
//                 >
//                   <FileText size={18} className="ml-2" />
//                   كتب الشعر
//                 </button>
//               </div>
              
//               {/* محتوى التبويبات */}
//               <div className="p-6">
//                 {activeTab === 'profile' && (
//                   <div>
//                     <h2 className="text-xl font-bold text-black mb-6 flex items-center">
//                       <User size={20} className="ml-2 text-orange-500" />
//                       نبذة عن المستخدم
//                     </h2>
                    
//                     <div className="bg-orange-50 p-6 rounded-lg">
//                       <div className="flex justify-center mb-6">
//                         <div className="bg-orange-100 p-4 rounded-full">
//                           <User size={40} className="text-orange-500" />
//                         </div>
//                       </div>
//                       <p className="text-black text-center mb-4">مرحباً، أنا {userData.name}!</p>
//                       <p className="text-gray-700 text-center">
//                         {userData.role} في مجال {userData.specialty} وحاصل على شهادة {userData.qualification}.
//                         أهتم بالقراءة والتعلم المستمر في مجال تخصصي وأسعى دائماً لتطوير مهاراتي.
//                       </p>
                      
//                       <div className="grid grid-cols-2 gap-4 mt-8">
//                         <div className="bg-white p-4 rounded-lg shadow-sm">
//                           <div className="flex items-center justify-center bg-orange-100 w-12 h-12 rounded-full mx-auto mb-2">
//                             <BookOpen size={20} className="text-orange-500" />
//                           </div>
//                           <p className="text-center font-medium text-black">
//                             {favoriteBooks.length} كتب مفضلة
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg shadow-sm">
//                           <div className="flex items-center justify-center bg-orange-100 w-12 h-12 rounded-full mx-auto mb-2">
//                             <FileText size={20} className="text-orange-500" />
//                           </div>
//                           <p className="text-center font-medium text-black">
//                             {poemBooks.length} كتب شعرية
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {activeTab === 'favorites' && (
//                   <div>
//                     <h2 className="text-xl font-bold text-black mb-6 flex items-center">
//                       <Heart size={20} className="ml-2 text-orange-500" />
//                       الكتب المفضلة
//                     </h2>
                    
//                     {favoriteBooks.length > 0 ? (
//                       <div className="space-y-4">
//                         {favoriteBooks.map(book => (
//                           <div key={book.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
//                             <div className="flex items-center">
//                               <div className="bg-orange-100 p-3 rounded-lg">
//                                 <BookMarked size={24} className="text-orange-500" />
//                               </div>
//                               <div className="mr-4 flex-1">
//                                 <h3 className="font-bold text-black">{book.title}</h3>
//                                 <p className="text-gray-600 text-sm">{book.author}</p>
//                               </div>
//                               <div>
//                                 <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
//                                   {book.category}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="bg-orange-50 rounded-lg p-6 text-center">
//                         <div className="flex justify-center mb-4">
//                           <Heart size={40} className="text-orange-300" />
//                         </div>
//                         <p className="text-gray-700">لا توجد كتب مفضلة حتى الآن</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {activeTab === 'poems' && (
//                   <div>
//                     <h2 className="text-xl font-bold text-black mb-6 flex items-center">
//                       <FileText size={20} className="ml-2 text-orange-500" />
//                       كتب الشعر
//                     </h2>
                    
//                     {poemBooks.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {poemBooks.map(book => (
//                           <div key={book.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                             <div className="bg-orange-100 p-4">
//                               <h3 className="font-bold text-black text-center">{book.title}</h3>
//                             </div>
//                             <div className="p-4">
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-gray-700">{book.author}</span>
//                                 <span className="text-gray-500 text-sm">{book.year}</span>
//                               </div>
//                               <div className="mt-4 flex justify-center">
//                                 <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded transition duration-200">
//                                   عرض التفاصيل
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="bg-orange-50 rounded-lg p-6 text-center">
//                         <div className="flex justify-center mb-4">
//                           <FileText size={40} className="text-orange-300" />
//                         </div>
//                         <p className="text-gray-700">لا توجد كتب شعرية حتى الآن</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }