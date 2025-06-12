import { useState } from 'react';
import { Clock, Tag, Headphones, FileText, Facebook, Twitter, Instagram } from 'lucide-react';

export default function About() {
  return (
    <div className="font-sans text-right" dir="rtl">
      {/* Hero Section */}
      <div className="bg-slate-700 text-center py-25 px-4 p-20 ">
        <h1 className="text-2xl md:text-2xl font-bold text-white mb-2">قصيد هو بوابتك لفهم أعمق لعالم الأدب</h1>
        <div className="h-16"></div> {/* Spacer */}
      </div>

      {/* Why Kasid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 pt-20">
        <h2 className="text-2xl font-bold text-center mb-12">
          لماذا <span className="text-orange-500">قصيد</span>؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <Tag className="text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">أسعار مناسبة</h3>
            <p className="text-gray-600 text-center">نقدم خدمات عالية الجودة وبأسعار تنافسية تناسب الجميع.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <FileText className="text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">محتوى دقيق وموثوق</h3>
            <p className="text-gray-600 text-center">نوفر تشريحات أدبية محكمة مع مراجعات متخصصة لضمان الدقة والجودة.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <Clock className="text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">خدمة سريعة</h3>
            <p className="text-gray-600 text-center">نحرص على تقديم خدماتنا بسرعة مع الحفاظ على أعلى مستوى من الجودة.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <Headphones className="text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">دعم مستمر</h3>
            <p className="text-gray-600 text-center">فريقنا متواجد دائماً للرد على استفساراتكم وتقديم المساعدة.</p>
          </div>
        </div>
      </div>
      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-4">
          فريق <span className="text-orange-500">قصيد</span>
        </h2>
        <p className="text-gray-600 text-center mb-12">
          فريقنا يجمع نخبة من المختصين في الأدب، لنقدم لكم تجارب وخدمات متميزة
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <div className="rounded-full border-2 border-orange-500 p-1 mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 64 64" className="w-16 h-16 text-gray-400">
  {/* الوجه */}
  <circle cx="32" cy="20" r="12" fill="#ffedd5" />
  
  {/* الجسم */}
  <path d="M20,40 Q32,50 44,40 Q42,55 22,55 Z" fill="#f97316" />
  
  {/* شارة التحقق */}
  <circle cx="48" cy="16" r="6" fill="#10b981" />
  <path d="M46.5 16.5 l1.5 1.5 l3 -3" stroke="white" strokeWidth="2" fill="none" />
</svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">إيمان كمال</h3>
            <p className="text-gray-600 mb-4">ناقدة أدبية</p>
            <div className="flex gap-2">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Twitter size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <div className="rounded-full border-2 border-orange-500 p-1 mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                 <svg viewBox="0 0 64 64" className="w-16 h-16 text-gray-400">
  {/* الوجه */}
  <circle cx="32" cy="20" r="12" fill="#ffedd5" />
  
  {/* الجسم */}
  <path d="M20,40 Q32,50 44,40 Q42,55 22,55 Z" fill="#f97316" />
  
  {/* شارة التحقق */}
  <circle cx="48" cy="16" r="6" fill="#10b981" />
  <path d="M46.5 16.5 l1.5 1.5 l3 -3" stroke="white" strokeWidth="2" fill="none" />
</svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">هدى الفوالجة</h3>
            <p className="text-gray-600 mb-4">باحثة أدبية</p>
            <div className="flex gap-2">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Twitter size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
            <div className="rounded-full border-2 border-orange-500 p-1 mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
               <svg viewBox="0 0 64 64" className="w-16 h-16 text-gray-400">
  {/* الوجه */}
  <circle cx="32" cy="20" r="12" fill="#ffedd5" />
  
  {/* الجسم */}
  <path d="M20,40 Q32,50 44,40 Q42,55 22,55 Z" fill="#f97316" />
  
  {/* شارة التحقق */}
  <circle cx="48" cy="16" r="6" fill="#10b981" />
  <path d="M46.5 16.5 l1.5 1.5 l3 -3" stroke="white" strokeWidth="2" fill="none" />
</svg>

              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">بيسان خالد</h3>
            <p className="text-gray-600 mb-4">كاتبة ومحررة</p>
            <div className="flex gap-2">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Twitter size={16} />
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}