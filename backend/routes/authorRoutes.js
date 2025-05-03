// routes/authorRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');

router.get("/", getAuthors);          // عرض كل الأدباء
router.post("/", createAuthor);       // إضافة أديب
router.put("/:id", updateAuthor);     // تعديل أديب
router.delete("/:id", deleteAuthor);  // حذف أديب

module.exports = router;
