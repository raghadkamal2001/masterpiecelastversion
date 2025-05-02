import React, { useState, useEffect } from 'react';
import final from '../../assets/logo.png';
import { Search } from "lucide-react"; // استيراد أيقونة البحث


const ArabicLiteratureWebsite = () => {
  // حالة للسلايدر
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // الصور والمحتوى للسلايدر
  const slides = [
    {
      id: 1,
      title: "استكشف جمال الأدب العربي مع شروحات مبسطة وتحليلات عميقة للنصوص الشعرية والنثرية",
      bgImage: "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "اكتشف روائع الشعر العربي القديم والحديث مع تفسيرات شاملة",
      bgImage: "https://images.pexels.com/photos/2128249/pexels-photo-2128249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "تعرف على أشهر الأدباء والشعراء العرب وأعمالهم الخالدة",
      bgImage: "https://images.pexels.com/photos/2943603/pexels-photo-2943603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  // التنقل التلقائي بين الشرائح
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // وظائف التنقل
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden pt-2 ">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-3000" 
            style={{ 
              backgroundImage: `url(${slide.bgImage})`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/70 opacity-50 z-0"></div>
        </div>
      ))}
      
      {/* النافبار المحسن - أكثر وضوحًا مع خلفية شبه شفافة */}
      <header className="relative z-20 w-full">
        <div >
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
                     {/* أيقونات البحث والمفضلة */}
                     <div className="flex space-x-4">
                     <button className="text-white hover:text-amber-500 transition text-xl ml-20">
      <Search size={24} />
    </button>
            </div>

            {/* قائمة التنقل */}
            <nav className="hidden md:flex space-x-6 items-center ml-70 " dir="rtl">
              <a href="#" className="text-amber-500 font-semibold border-b-2 border-amber-500 pb-1">الرئيسية</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">نبذة عنا</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">الأقسام</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">الاقتباسات</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">تواصل معنا</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1"> أعلام الأدب</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">تسجيل الدخول</a>
              <a href="#" className="text-white hover:text-amber-500 hover:border-b-2 hover:border-amber-500 transition pb-1">انضم الينا</a>
            </nav>
            <div className="flex items-center mr-25">
  <img 
    src={final} 
    alt="Logo" 
    className="h-40 w-35 object-cover rounded-md" 
  />
</div>

          
          </div>
        </div>
      </header>
      
      {/* المحتوى الرئيسي */}
      <main className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)]" dir="rtl">
        <div className="text-center px-6 py-12 bg-transparent w-full max-w-4xl">
          {/* <span className="text-amber-500 text-lg mb-4 block">من هنا</span> */}
          
          {/* Slide Content */}
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`transition-opacity duration-1000 ease-in-out absolute top-0 left-0 right-0 px-6 py-12 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <h1 className="text-white text-3xl md:text-4xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg mt-20">
                {slide.title}
              </h1>
            </div>
          ))}
          
          {/* Empty space to maintain layout while content is absolute positioned */}
          <div className="h-32 md:h-40"></div>
          
          <div className="mt-10">
            <button className="bg-transparent hover:bg-amber-500 text-amber-500 hover:text-black font-bold py-2 px-8 border border-amber-500 hover:border-transparent rounded-full transition duration-300">
              ابدأ الآن
            </button>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex space-x-2 mt-8 bg-transparent">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-amber-500 w-6' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </main>
      
      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 left-6 z-10 p-1 rounded-full backdrop-blur-sm hover:bg-black/40 transition ">
        <button 
          onClick={goToPrevSlide}
          className="text-amber-500 text-3xl font-bold hover:text-amber-300 transition"
        >
          &lt;
        </button>
      </div>
      <div className="absolute bottom-1/2 right-6 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition">
        <button 
          onClick={goToNextSlide}
          className="text-amber-500 text-3xl font-bold hover:text-amber-300 transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ArabicLiteratureWebsite;