
import React from 'react';
import { Link } from 'react-router-dom'; // إذا كنت تستخدم React Router



const Navbar = () => {
    return (
        <header className="relative z-20 w-full border-b border-amber-500/30">
        <div className="bg-black/40 backdrop-blur-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <div className="text-amber-500 text-3xl font-arabic" style={{ fontFamily: 'cursive' }}>قصيدة</div>
            
            {/* قائمة التنقل */}
            <nav className="hidden md:flex space-x-6 items-center" dir="rtl">
              <a href="#" className="text-amber-500 font-semibold border-b-2 border-amber-500 pb-1">الرئيسية</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">نبذة عنا</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">الأقسام</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">المقالات</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">تواصل معنا</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">اعلن الآن</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">تسجيل الدخول</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">انضم الينا</a>
            </nav>
            
            {/* أيقونات البحث والمفضلة */}
            <div className="flex space-x-4">
              <button className="text-white hover:text-amber-500 transition text-xl">❤</button>
              <button className="text-white hover:text-amber-500 transition text-xl">🔍</button>
            </div>
          </div>
        </div>
      </header>  );
};

export default Navbar;