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
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">إدارة المستخدمين</h1>
        
        {/* زر إضافة مستخدم جديد */}
        <div className="mb-6">
          <button 
            onClick={() => {
              setFormMode('add');
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <UserPlusIcon size={18} />
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>
        
        {/* عرض الخطأ */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700">
              <XCircleIcon size={18} />
            </button>
          </div>
        )}
        
        {/* نموذج إضافة/تعديل مستخدم */}
        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {formMode === 'add' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircleIcon size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">اسم المستخدم</label>
                  <input
                    type="text"
                    name="username"
                    value={currentUser.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    كلمة المرور {formMode === 'edit' && <span className="text-gray-500 text-sm">(اتركها فارغة إذا لم ترغب بتغييرها)</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={formMode === 'add'}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {formMode === 'add' ? 'إضافة' : 'تحديث'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* جدول المستخدمين */}
        {loading ? (
          <div className="text-center py-8">جاري التحميل...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">لا يوجد مستخدمين</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-right">الاسم</th>
                  <th className="py-3 px-4 text-right">اسم المستخدم</th>
                  <th className="py-3 px-4 text-right">البريد الإلكتروني</th>
                  <th className="py-3 px-4 text-right">تاريخ الإنشاء</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setupEditForm(user)}
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="تعديل"
                        >
                          <PencilIcon size={18} />
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
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