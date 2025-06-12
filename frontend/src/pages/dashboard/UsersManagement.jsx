import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, UserPlusIcon, XCircleIcon } from 'lucide-react';


export default function UserManagement() {
  // state للمستخدمين وحالة التحميل والخطأ
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // state لنموذج إضافة/تعديل المستخدم
  const [formMode, setFormMode] = useState('add'); // 'add' أو 'edit'
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    username: '',
    email: '',
    password: ''
  });

  // جلب بيانات المستخدمين عند تحميل المكون
  useEffect(() => {
    fetchUsers();
  }, []);

  // دالة جلب المستخدمين
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'حدث خطأ أثناء جلب البيانات');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // دالة إضافة مستخدم جديد
  const addUser = async (userData) => {
    try {
      const response = await fetch(`${'http://localhost:5000/api/users'}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // إظهار رسالة نجاح
        alert('تمت إضافة المستخدم بنجاح!');
        fetchUsers(); // إعادة تحميل المستخدمين
        return { success: true };
      } else {
        // إظهار رسالة الخطأ من الخادم
        alert(`خطأ: ${data.message || 'فشل في إضافة المستخدم'}`);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Error adding user:', err);
      alert('فشل الاتصال بالخادم! الرجاء المحاولة لاحقاً');
      return { success: false, message: 'فشل الاتصال بالخادم' };
    }
  };

  // دالة تحديث بيانات مستخدم
  const updateUser = async (id, userData) => {
    try {
      const response = await fetch(`${'http://localhost:5000/api/users'}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchUsers(); // إعادة تحميل المستخدمين
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Error updating user:', err);
      return { success: false, message: 'فشل الاتصال بالخادم' };
    }
  };

  // دالة حذف مستخدم
  const deleteUser = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      return;
    }
    
    try {
      const response = await fetch(`${'http://localhost:5000/api/users'}/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // تحديث قائمة المستخدمين بعد الحذف
        setUsers(users.filter(user => user._id !== id));
      } else {
        setError(data.message || 'حدث خطأ أثناء الحذف');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم');
      console.error('Error deleting user:', err);
    }
  };

  // دالة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (formMode === 'add') {
      result = await addUser(currentUser);
    } else {
      // حذف كلمة المرور إذا كانت فارغة عند التعديل
      const userData = { ...currentUser };
      if (!userData.password) {
        delete userData.password;
      }
      result = await updateUser(currentUser._id, userData);
    }
    
    if (result.success) {
      resetForm();
    } else {
      setError(result.message);
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setCurrentUser({
      _id: '',
      name: '',
      username: '',
      email: '',
      password: ''
    });
    setShowForm(false);
    setError(null);
  };

  // إعداد نموذج التعديل
  const setupEditForm = (user) => {
    setCurrentUser({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: '' // لا نعيد كلمة المرور للتعديل
    });
    setFormMode('edit');
    setShowForm(true);
  };

  // دالة تحديث قيم النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
  <div className="container mx-auto p-6 bg-gray-50 min-h-screen" dir="rtl">
  <div className="max-w-7xl mx-auto space-y-8">
    <h1 className="text-4xl font-bold text-gray-800 text-center">لوحة إدارة المستخدمين</h1>

    {/* زر إضافة مستخدم */}
    <div className="flex justify-end">
      <button 
        onClick={() => {
          setFormMode('add');
          setShowForm(true);
        }}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition duration-300"
      >
        <UserPlusIcon size={20} />
        إضافة مستخدم جديد
      </button>
    </div>

    {/* رسالة الخطأ */}
    {error && (
      <div className="flex items-center justify-between bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg shadow-sm">
        <span>{error}</span>
        <button onClick={() => setError(null)}>
          <XCircleIcon size={20} className="hover:text-red-600 transition" />
        </button>
      </div>
    )}

    {/* نموذج إضافة / تعديل */}
    {showForm && (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            {formMode === 'add' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}
          </h2>
          <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 transition">
            <XCircleIcon size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-600 font-medium">الاسم</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                كلمة المرور{' '}
                {formMode === 'edit' && (
                  <span className="text-sm text-gray-400">(اختياري)</span>
                )}
              </label>
              <input
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formMode === 'add'}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              {formMode === 'add' ? 'إضافة' : 'تحديث'}
            </button>
          </div>
        </form>
      </div>
    )}

    {/* جدول المستخدمين */}
    {loading ? (
      <div className="text-center py-12 text-gray-500 text-lg">جاري تحميل البيانات...</div>
    ) : users.length === 0 ? (
      <div className="text-center py-12 bg-white shadow-md rounded-xl text-gray-600">
        لا يوجد مستخدمون حالياً
      </div>
    ) : (
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-base">
            <tr>
              <th className="py-4 px-6 text-right">الاسم</th>
              <th className="py-4 px-6 text-right">اسم المستخدم</th>
              <th className="py-4 px-6 text-right">البريد الإلكتروني</th>
              <th className="py-4 px-6 text-right">تاريخ الإنشاء</th>
              <th className="py-4 px-6 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setupEditForm(user)}
                      className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"
                      title="تعديل"
                    >
                      <PencilIcon size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
                      title="حذف"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

  );
}