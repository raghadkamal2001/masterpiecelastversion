import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // جلب البيانات
  const fetchAuthors = async () => {
    const res = await axios.get(API_URL);
    setAuthors(res.data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // إضافة أو تعديل
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/authors/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", era: "", shortDescription: "", longDescription: "" });
    setEditingId(null);
    fetchAuthors();
  };

  // حذف
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/authors/${id}`);
    fetchAuthors();
  };

  // تعبئة النموذج للتعديل
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">إدارة الأدباء</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-100 p-4 rounded">
        <input
          type="text"
          placeholder="اسم الأديب"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="text"
          placeholder="العصر"
          value={form.era}
          onChange={(e) => setForm({ ...form, era: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="وصف قصير"
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="وصف طويل"
          value={form.longDescription}
          onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "تعديل الأديب" : "إضافة أديب"}
        </button>
      </form>

      <div className="grid gap-4">
        {authors.map((author) => (
          <div key={author._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p className="text-gray-600">{author.era}</p>
            <p>{author.shortDescription}</p>
            <p className="text-sm text-gray-700">{author.longDescription}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(author)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(author._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
