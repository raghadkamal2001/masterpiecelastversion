import { useState, useEffect } from 'react';
import { Bell, BookOpen, CreditCard, DollarSign, Home, LogOut, Menu, Search, Settings, User, Users, X } from 'lucide-react';
import DashboardContent from "./dashboardcontent"
import BooksManagement from "./books"
import UsersManagement from "./UsersManagement"
import AuthorsManagement from "./authors"
import QuotesManagement from "./qoute"
import PaymentsManagement from "./paymentsettings"
import SettingsContent from "./settings"
import MessagesPage from "./contact"
import { jwtDecode } from 'jwt-decode'; 


// الكومبوننت الرئيسي للداشبورد
export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // قوائم الجانب الرئيسية
  const sidebarItems = [
    { id: 'dashboard', name: 'الرئيسية', icon: <Home className="ml-2" size={18} /> },
    { id: 'books', name: 'إدارة الكتب', icon: <BookOpen className="ml-2" size={18} /> },
    { id: 'users', name: 'إدارة المستخدمين', icon: <Users className="ml-2" size={18} /> },
    { id: 'authors', name: 'الأدباء والشعراء', icon: <User className="ml-2" size={18} /> },
    { id: 'payments', name: 'عمليات الدفع', icon: <DollarSign className="ml-2" size={18} /> },
    // { id: 'contacts', name: 'رسائل المستخدمين  ', icon: <MessagesPage className="ml-2" size={18} /> },
        // { id: 'payments', name: 'رسائل المستخدمين  ', icon: <DollarSign className="ml-2" size={18} /> },

    { id: 'settings', name: 'رسائل المستخدمين', icon: <Settings className="ml-2" size={18} /> },
  ];

  // تبديل عرض الشريط الجانبي
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

   useEffect(() => {
    const token = getCookie("token"); // التوكن من الكوكيز

    if (!token) {
      window.location.href = "/login";
    } else {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("أنت غير مصرح لك بدخول لوحة التحكم");
        window.location.href = "/";
      }
    }
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  // عرض المحتوى المناسب حسب التاب المختار
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'books':
        return <BooksManagement />;
      case 'users':
        return <UsersManagement />;
      case 'quotes':
        return <QuotesManagement />;
      case 'authors':
        return <AuthorsManagement />;
      case 'payments':
        return <PaymentsManagement />;
      case 'settings':
        return <SettingsContent />;
        case 'contacts':
        return <BooksManagement />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* الشريط الجانبي */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <h1 className="text-xl font-bold">قصيد | لوحة التحكم</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-3 ${
                    activeTab === item.id ? 'bg-amber-500' : 'hover:bg-gray-800'
                  } transition-colors`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center w-full p-2 rounded transition-colors">
            <LogOut className="ml-2" size={18} />
            {isSidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* شريط العنوان */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {sidebarItems.find((item) => item.id === activeTab)?.name || 'الرئيسية'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  className="py-2 pr-10 pl-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="absolute top-2 right-3 text-gray-500" size={18} />
              </div>
             
              <div className="flex items-center">
                
                {/* {isSidebarOpen && <span className="mr-2">مدير النظام</span>} */}
              </div>
            </div>
          </div>
        </header>

        {/* محتوى الصفحة */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

 
 