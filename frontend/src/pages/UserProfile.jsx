import React, { useState } from 'react';
import { User, Mail, Book, Phone, MapPin, Calendar, Briefcase, Heart } from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('info');
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const userData = {
    name: 'أحمد محمد علي',
    email: 'ahmed.mohamed@example.com',
    phone: '+962-79-1234567',
    location: 'عمان، الأردن',
    birthDate: '15 مارس 1990',
    occupation: 'مطور تطبيقات',
    bio: 'مطور شغوف بالتكنولوجيا والأدب، أحب قراءة الكتب والبرمجة في وقت فراغي.',
    favoriteBooks: [
      'مئة عام من العزلة - غابرييل غارسيا ماركيز',
      'الأسود يليق بك - إحسان عبد القدوس',
      'مدن الملح - عبد الرحمن منيف',
      'رجال في الشمس - غسان كنفاني',
      'الخبز الحافي - محمد شكري',
      'عزازيل - يوسف زيدان'
    ],
    hobbies: [
      'القراءة',
      'البرمجة',
      'السفر',
      'التصوير',
      'الطبخ'
    ]
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      {/* زر فتح الملف الشخصي */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <button onClick={toggleProfilePopup} className="flex items-center focus:outline-none">
          <User size={20} className="text-amber-500" />
          <span className="font-arabic mr-2">اسم المستخدم</span>
        </button>
      </div>

      {/* نافذة الملف الشخصي المنبثقة */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">الملف الشخصي</h3>
              <button 
                onClick={toggleProfilePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {/* محتوى الملف الشخصي - يمكنك استخدام نفس محتوى UserProfile */}
            <div className="p-6">
              <div className="flex justify-center pt-4 pb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-300">
                  <User size={30} className="text-orange-600" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {userData.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {userData.bio}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">البريد الإلكتروني</div>
                    <div className="text-gray-700 text-sm">{userData.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">رقم الهاتف</div>
                    <div className="text-gray-700 text-sm">{userData.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* بقية محتوى الصفحة */}
      <div className="max-w-md mx-auto">
        {/* بطاقة المستخدم */}
        <div className="bg-white rounded-lg border-2 border-orange-500 shadow-sm overflow-hidden">
          {/* صورة المستخدم */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-300">
              <User size={40} className="text-orange-600" />
            </div>
          </div>

          {/* التبويبات */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-3 px-2 text-center font-medium transition-colors text-sm ${
                activeTab === 'info'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <User size={16} className="inline-block ml-1" />
              المعلومات
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`flex-1 py-3 px-2 text-center font-medium transition-colors text-sm ${
                activeTab === 'books'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Book size={16} className="inline-block ml-1" />
              الكتب
            </button>
            <button
              onClick={() => setActiveTab('hobbies')}
              className={`flex-1 py-3 px-2 text-center font-medium transition-colors text-sm ${
                activeTab === 'hobbies'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Heart size={16} className="inline-block ml-1" />
              الهوايات
            </button>
          </div>

          {/* محتوى التبويبات */}
          <div className="p-6">
            {activeTab === 'info' ? (
              <div className="space-y-6">
                {/* الاسم والوصف */}
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {userData.bio}
                  </p>
                </div>

                {/* المعلومات الأساسية */}
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">البريد الإلكتروني</div>
                      <div className="text-gray-700 text-sm">{userData.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">رقم الهاتف</div>
                      <div className="text-gray-700 text-sm">{userData.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">الموقع</div>
                      <div className="text-gray-700 text-sm">{userData.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">تاريخ الميلاد</div>
                      <div className="text-gray-700 text-sm">{userData.birthDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Briefcase size={18} className="text-orange-600 ml-3 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">المهنة</div>
                      <div className="text-gray-700 text-sm">{userData.occupation}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'books' ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  الكتب المفضلة
                </h3>
                <ul className="space-y-3">
                  {userData.favoriteBooks.map((book, index) => (
                    <li 
                      key={index}
                      className="flex items-start p-3 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <Book size={16} className="text-orange-600 ml-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm leading-relaxed">{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  الهوايات والاهتمامات
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {userData.hobbies.map((hobby, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <Heart size={16} className="text-orange-600 ml-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{hobby}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}