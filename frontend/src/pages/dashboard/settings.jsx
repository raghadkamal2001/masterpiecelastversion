import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react'; // تأكد من تثبيت lucide-react

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch('http://localhost:5000/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  const deleteMessage = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف الرسالة؟')) {
      await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">📨 الرسائل الواردة</h2>
      {messages.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد رسائل حالياً</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white border border-orange-200 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="space-y-1 mb-4">
                <p><span className="font-semibold text-orange-600">👤 الاسم:</span> {msg.name}</p>
                <p><span className="font-semibold text-orange-600">📧 البريد:</span> {msg.email}</p>
                <p><span className="font-semibold text-orange-600">📱 الهاتف:</span> {msg.phone}</p>
                <p><span className="font-semibold text-orange-600">📝 الموضوع:</span> {msg.subject}</p>
                <p><span className="font-semibold text-orange-600">💬 الرسالة:</span> {msg.message}</p>
              </div>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                <Trash2 size={18} />
                حذف الرسالة
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
