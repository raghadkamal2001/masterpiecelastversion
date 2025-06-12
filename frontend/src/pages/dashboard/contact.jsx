// MessagesList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact/messages")
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.error("حدث خطأ أثناء جلب الرسائل:", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">الرسائل المستلمة</h2>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg._id} className="border p-4 rounded bg-white shadow">
            <h3 className="text-xl font-bold">{msg.subject}</h3>
            <p><strong>من:</strong> {msg.name} - {msg.email}</p>
            <p><strong>الهاتف:</strong> {msg.phone}</p>
            <p><strong>الرسالة:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
