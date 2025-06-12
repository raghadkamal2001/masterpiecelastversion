// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/authors";

// export default function AuthorManager() {
//   const [authors, setAuthors] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     era: "",
//     shortDescription: "",
//     longDescription: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   // جلب البيانات
//   const fetchAuthors = async () => {
//     const res = await axios.get(API_URL);
//     setAuthors(res.data);
//   };

//   useEffect(() => {
//     fetchAuthors();
//   }, []);

//   // إضافة أو تعديل
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/authors/${editingId}`, form);
//     } else {
//       await axios.post(API_URL, form);
//     }
//     setForm({ name: "", era: "", shortDescription: "", longDescription: "" });
//     setEditingId(null);
//     fetchAuthors();
//   };

//   // حذف
//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/authors/${id}`);
//     fetchAuthors();
//   };

//   // تعبئة النموذج للتعديل
//   const handleEdit = (author) => {
//     setForm({
//       name: author.name,
//       era: author.era,
//       shortDescription: author.shortDescription,
//       longDescription: author.longDescription,
//     });
//     setEditingId(author._id);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">إدارة الأدباء</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-100 p-4 rounded">
//         <input
//           type="text"
//           placeholder="اسم الأديب"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full p-2 border"
//           required
//         />
//         <input
//           type="text"
//           placeholder="العصر"
//           value={form.era}
//           onChange={(e) => setForm({ ...form, era: e.target.value })}
//           className="w-full p-2 border"
//           required
//         />
//         <textarea
//           placeholder="وصف قصير"
//           value={form.shortDescription}
//           onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
//           className="w-full p-2 border"
//           required
//         />
//         <textarea
//           placeholder="وصف طويل"
//           value={form.longDescription}
//           onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
//           className="w-full p-2 border"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {editingId ? "تعديل الأديب" : "إضافة أديب"}
//         </button>
//       </form>

//       <div className="grid gap-4">
//         {authors.map((author) => (
//           <div key={author._id} className="border p-4 rounded shadow">
//             <h2 className="text-xl font-semibold">{author.name}</h2>
//             <p className="text-gray-600">{author.era}</p>
//             <p>{author.shortDescription}</p>
//             <p className="text-sm text-gray-700">{author.longDescription}</p>
//             <div className="mt-2 space-x-2">
//               <button
//                 onClick={() => handleEdit(author)}
//                 className="bg-yellow-400 px-3 py-1 rounded"
//               >
//                 تعديل
//               </button>
//               <button
//                 onClick={() => handleDelete(author._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 حذف
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, UserPlus } from "lucide-react"; // تأكد من تثبيت lucide-react

const API_URL = "http://localhost:5000/api/authors";

export default function AuthorManager() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    era: "",
    shortDescription: "",
    longDescription: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchAuthors = async () => {
    const res = await axios.get(API_URL);
    setAuthors(res.data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", era: "", shortDescription: "", longDescription: "" });
    setEditingId(null);
    fetchAuthors();
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الأديب؟")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchAuthors();
    }
  };

  const handleEdit = (author) => {
    setForm({
      name: author.name,
      era: author.era,
      shortDescription: author.shortDescription,
      longDescription: author.longDescription,
    });
    setEditingId(author._id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center">
        📚 إدارة الأدباء
      </h1>

      {/* 📝 نموذج إضافة / تعديل أديب */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mb-12 bg-white shadow-lg border border-orange-200 p-6 rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="اسم الأديب"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="text"
            placeholder="العصر"
            value={form.era}
            onChange={(e) => setForm({ ...form, era: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <textarea
          placeholder="وصف قصير"
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows="3"
          required
        />
        <textarea
          placeholder="وصف طويل"
          value={form.longDescription}
          onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows="5"
          required
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {editingId ? (
            <>
              <Pencil size={18} /> تعديل الأديب
            </>
          ) : (
            <>
              <UserPlus size={18} /> إضافة أديب
            </>
          )}
        </button>
      </form>

      {/* 👨‍🏫 قائمة الأدباء */}
      <div className="grid gap-6 md:grid-cols-2">
        {authors.map((author) => (
          <div
            key={author._id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{author.name}</h2>
            <p className="text-sm text-orange-600 mb-2 font-medium">العصر: {author.era}</p>
            <p className="text-gray-700 mb-2">{author.shortDescription}</p>
            <p className="text-gray-600 text-sm">{author.longDescription}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(author)}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white font-medium transition"
              >
                <Pencil size={16} /> تعديل
              </button>
              <button
                onClick={() => handleDelete(author._id)}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition"
              >
                <Trash2 size={16} /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
