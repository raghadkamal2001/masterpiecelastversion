import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function QuotesSlider() {
  const quotes = [
    {
      text: "القراءة هي مفتاح الروح، حيث تفتح الأبواب المغلقة وتكشف عن العوالم الداخلية فينا. كما أن الكتاب هو مرآة العقل، يعكس أعماقنا ويعطي الحياة للقلب.",
      author: "أحمد شوقي"
    },
    {
      text: "الكتب هي الأصدقاء الصامتون الذين لا ينتقدونك أبداً، يُثرون عقلك ويُنيرون دربك، ويمنحونك الحكمة دون أن يطلبوا منك مقابلاً.",
      author: "نجيب محفوظ"
    },
    {
      text: "الأدب ليس فقط انعكاساً للواقع، بل هو محاولة لتغييره وتجميله. إنه صوت الإنسانية الذي يتردد صداه عبر العصور ليذكرنا بقيمنا وطموحاتنا.",
      author: "غسان كنفاني"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="bg-gray-200 py-16">
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="flex items-center">
          {/* Left Arrow */}
          <button onClick={prevQuote} className="absolute left-2 md:left-8 z-10 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition-all">
            <ChevronLeft className="text-gray-600" />
          </button>
          
          {/* Quotes Slider */}
          <div className="w-full overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentQuote * 100}%)` }}
            >
              {quotes.map((quote, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center">
                  <div className="text-center max-w-xl" dir="rtl">
                    <div className="text-4xl text-gray-400 font-serif mb-2 ">"</div>
                    <p className="text-gray-600 text-lg md:text-xl mb-4">
                      {quote.text}
                    </p>
                    <div className="text-4xl text-gray-400 font-serif">"</div>
                    <p className="text-gray-500 mt-4 font-medium">
                      {quote.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Arrow */}
          <button onClick={nextQuote} className="absolute right-2 md:right-8 z-10 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition-all">
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {quotes.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentQuote(index)} 
              className={`w-3 h-3 rounded-full transition-all ${
                currentQuote === index ? 'bg-orange-500 w-6' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}