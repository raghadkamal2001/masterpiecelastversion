// import React, { useState } from 'react';
// import final from '../assets/logo.png';
// import { Search, Heart, Menu, X } from 'lucide-react';


// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white p-5" dir='rtl'> 
//       <div className="container flex items-center justify-between mx-auto">
//         {/* Mobile menu button */}
//         <button 
//           className="md:hidden p-1" 
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X size={20}/> : <Menu size={20} />}
//         </button>
        
//         {/* Brand/Logo */}
//         <div className="flex items-center mr-15">
//          <img 
//            src={final} 
//            alt="Logo" 
//            className=" object-cover" 
//            style={{ width: '350px',height: '48px'}} 

//          />
//        </div>
       
        
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-8 text-s">
//           <a href="/" className="text-amber-500 font-medium font-arabic">الرئيسية</a>
//           <a href="/blog" className="hover:text-amber-500 font-arabic">نبذة عنا</a>
//           <a href="/details" className="hover:text-amber-500 font-arabic">الأقسام</a>
//           <a href="/statistics" className="hover:text-amber-500 font-arabic">الإقتباسات</a>
//           <a href="/contact" className="hover:text-amber-500 font-arabic">تواصل معنا</a>
//           <a href="/media" className="hover:text-amber-500 font-arabic">أعلام الأدب</a>
//           <a href="/login" className="hover:text-amber-500 font-arabic">تسجيل الدخول</a>
//           <a href="/registration" className="hover:text-amber-500 font-arabic">انضم إلينا</a>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="flex items-center space-x-4">
//           <button className="p-1 hover:text-amber-500">
//             <Search size={20} />
//           </button>
//           <button className="p-1 hover:text-amber-500">
//             <Heart size={20} />
//           </button>
//         </div>
//       </div>
      
//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-gray-800 p-4 mt-4 rounded-md">
//           <div className="flex flex-col space-y-3 text-right">
//             <a href="/" className="text-amber-500 py-2 font-arabic">الرئيسية</a>
//             <a href="/blog" className="hover:text-amber-500 py-2 font-arabic">نبذة عنا</a>
//             <a href="/sections" className="hover:text-amber-500 py-2 font-arabic">الأقسام</a>
//             <a href="/statistics" className="hover:text-amber-500 py-2 font-arabic">الإحصائيات</a>
//             <a href="/contact" className="hover:text-amber-500 py-2 font-arabic">تواصل معنا</a>
//             <a href="/media" className="hover:text-amber-500 py-2 font-arabic">أعلام الأدب</a>
//             <a href="/register" className="hover:text-amber-500 py-2 font-arabic">تسجيل الدخول</a>
//             <a href="/join" className="hover:text-amber-500 py-2 font-arabic">انضم إلينا</a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }     



import React, { useState, useEffect } from 'react';
import final from '../assets/logo.png';
import { Search, Heart, Menu, X, User } from 'lucide-react';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);


  const handleLogout = () => {
    Cookies.remove('token');         // حذف التوكن من الكوكيز
    setUsername(null);               // إخفاء اسم المستخدم من الواجهة
    window.location.href = '/';      // إعادة التوجيه (يمكن تغييره إلى "/login")
  };
  

  useEffect(() => {
    // تحقق من وجود توكن في الكوكيز
    const token = Cookies.get('token');
    if (token) {
      // استخراج اسم المستخدم من التوكن (هذا يعتمد على كيفية تخزينك للبيانات)
      // هنا نفترض أن التوكن يحتوي على اسم المستخدم أو يمكنك جلبها من API
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.username) {
          setUsername(payload.username);
        }
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-5" dir='rtl'> 
      <div className="container flex items-center justify-between mx-auto">
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-1" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20}/> : <Menu size={20} />}
        </button>
        
        {/* Brand/Logo */}
        <div className="flex items-center mr-15">
          <img 
            src={final} 
            alt="Logo" 
            className="object-cover" 
            style={{ width: '350px', height: '48px'}} 
          />
        </div>
       
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-s">
          <a href="/" className="text-amber-500 font-medium font-arabic">الرئيسية</a>
          <a href="/blog" className="hover:text-amber-500 font-arabic">نبذة عنا</a>
          <a href="/details" className="hover:text-amber-500 font-arabic">الأقسام</a>
          <a href="/statistics" className="hover:text-amber-500 font-arabic">الإقتباسات</a>
          <a href="/contact" className="hover:text-amber-500 font-arabic">تواصل معنا</a>
          <a href="/media" className="hover:text-amber-500 font-arabic">أعلام الأدب</a>
          {!username && (
            <>
              <a href="/login" className="hover:text-amber-500 font-arabic">تسجيل الدخول</a>
              <a href="/registration" className="hover:text-amber-500 font-arabic">انضم إلينا</a>
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:text-amber-500">
            <Search size={20} />
          </button>
          <button className="p-1 hover:text-amber-500">
            <Heart size={20} />
          </button>
          {username && (
  <>
    <div className="flex items-center space-x-2 mr-2">
      <User size={20} className="text-amber-500" />
      <span className="font-arabic">{username}</span>
    </div>
    <button
      onClick={handleLogout}
      className="ml-4 text-red-400 hover:text-red-600 font-arabic"
    >
      تسجيل الخروج
    </button>
  </>
)}

        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 mt-4 rounded-md">
          <div className="flex flex-col space-y-3 text-right">
            <a href="/" className="text-amber-500 py-2 font-arabic">الرئيسية</a>
            <a href="/blog" className="hover:text-amber-500 py-2 font-arabic">نبذة عنا</a>
            <a href="/sections" className="hover:text-amber-500 py-2 font-arabic">الأقسام</a>
            <a href="/statistics" className="hover:text-amber-500 py-2 font-arabic">الإحصائيات</a>
            <a href="/contact" className="hover:text-amber-500 py-2 font-arabic">تواصل معنا</a>
            <a href="/media" className="hover:text-amber-500 py-2 font-arabic">أعلام الأدب</a>
            {!username && (
              <>
                <a href="/login" className="hover:text-amber-500 py-2 font-arabic">تسجيل الدخول</a>
                <a href="/join" className="hover:text-amber-500 py-2 font-arabic">انضم إلينا</a>
              </>
            )}
           {username && (
  <>
    <div className="flex items-center justify-end space-x-2 py-2">
      <User size={20} className="text-amber-500" />
      <span className="font-arabic">{username}</span>
    </div>
    <button
      onClick={handleLogout}
      className="text-red-400 hover:text-red-600 text-right font-arabic mt-2"
    >
      تسجيل الخروج
    </button>
  </>
)}

          </div>
        </div>
      )}
    </nav>
  );
}