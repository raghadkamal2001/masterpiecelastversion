import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-12 p-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* الاشتراك (moved to leftmost position) */}
          <div className="text-right order-4 md:order-1">
            <h3 className="text-lg font-bold mb-4 border-b border-orange-400 pb-2 inline-block">الاشتراك</h3>
            <p className="text-gray-300 text-sm mb-4">
              اشترك في قائمتنا البريدية للحصول على آخر التحديثات
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <button 
                type="submit" 
                className="bg-orange-400 hover:bg-orange-500 text-white p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-2 bg-gray-800 border border-gray-700 text-white"
                required
              />
            </form>
          </div>

          {/* قصيد (now second from left) */}
          <div className="text-right order-3 md:order-2">
            <h3 className="text-lg font-bold mb-4 border-b border-orange-400 pb-2 inline-block">قصيد</h3>
            <ul className="text-gray-300 space-y-2">
             <a href="/"> <li className="flex items-center justify-end gap-2">
                <span>الرئيسية</span>
                <span className="text-orange-400">›</span>
              </li></a>
              <a href="/about"><li className="flex items-center justify-end gap-2">
                <span>نبذة عنا</span>
                <span className="text-orange-400">›</span>
              </li></a>
              <a href="/details"><li className="flex items-center justify-end gap-2">
                <span>كل الأقسام</span>
                <span className="text-orange-400">›</span>
              </li></a>
              <a href="/"><li className="flex items-center justify-end gap-2">
                <span>أعلام الأدب</span>
                <span className="text-orange-400">›</span>
              </li></a>
             <a href="/contact"> <li className="flex items-center justify-end gap-2">
                <span>تواصل معنا</span>
                <span className="text-orange-400">›</span>
              </li></a>
            </ul>
          </div>

          {/* تواصل معنا (now third from left) */}
          <div className="text-right order-2 md:order-3">
            <h3 className="text-lg font-bold mb-4 border-b border-orange-400 pb-2 inline-block">تواصل معنا</h3>
            <p className="text-gray-300 mb-2">support@qaseed.com</p>
            <p className="text-gray-300">+00 111 222 3333</p>
          </div>

          {/* عن قصيد (moved to rightmost position) */}
          <div className="text-right order-1 md:order-4">
            <h3 className="text-lg font-bold mb-4 border-b border-orange-400 pb-2 inline-block">عن قصيد</h3>
            <p className="text-gray-300 text-sm">
              قصيد، منصتك الأدبية التي تثري بحقل وإبداعات، عتبة لأفضل الأدبية، ومناط الضوء على أبرز أعلام الكلمة والشعر.
            </p>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" />
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
              </svg>
            </a>
          </div>
          <div className="text-gray-400 text-sm text-right">
          حقوق النشر والتأليف محفوظه لأصحابها تبعاَ لأسمائهم وتصنيفاتهم

          </div>
        </div>
      </div>
    </footer>
  );
}