// const Book = require('../models/Book');

// const createBook = async (req, res) => {
//   try {
//     const book = new Book(req.body);
//     const savedBook = await book.save();
//     res.status(201).json(savedBook);
//   } catch (error) {
//     console.error("Error creating book:", error);
//     res.status(500).json({ message: 'حدث خطأ أثناء حفظ الكتاب.' });
//   }
// };

// const getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: 'الكتاب غير موجود' });
//     }
//     res.json(book);
//   } catch (err) {
//     res.status(500).json({ error: 'خطأ في جلب الكتاب' });
//   }
// };

// const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: 'خطأ في جلب الكتب' });
//   }
// };

// const deleteBook = async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: 'تم حذف الكتاب بنجاح' });
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في الحذف' });
//   }
// };

// const updateBook = async (req, res) => {
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedBook);
//   } catch (err) {
//     res.status(500).json({ error: 'فشل في التعديل' });
//   }
// };

// const getBookWithAccess = async (req, res) => {
//   const userId = req.user._id;
//   const { id } = req.params; // bookId

//   const book = await Book.findById(id);
//   if (!book) return res.status(404).json({ message: 'الكتاب غير موجود' });

//   const payment = await Payment.findOne({ userId, bookId: id, isApproved: true });

//   const canAccessFull = !!payment;

//   res.json({ book, canAccessFull });
// };

// module.exports = {
//   createBook,
//   getAllBooks,
// deleteBook,
// updateBook,
// getBookById, 
// getBookWithAccess

// };


const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: 'حدث خطأ أثناء حفظ الكتاب.' });
  }
};



const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'الكتاب غير موجود' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'خطأ في جلب الكتاب' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'خطأ في جلب الكتب' });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف الكتاب بنجاح' });
  } catch (err) {
    res.status(500).json({ error: 'فشل في الحذف' });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'فشل في التعديل' });
  }
};

const getBookWithAccess = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params; // bookId

  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ message: 'الكتاب غير موجود' });

  const payment = await Payment.findOne({ userId, bookId: id, isApproved: true });

  const canAccessFull = !!payment;

  res.json({ book, canAccessFull });
};

const searchBooks = async (req, res) => {
  const { query } = req.query; // نأخذ النص من /api/books/search?query=xxx

  try {
    const searchRegex = new RegExp(query, 'i'); // بحث غير حساس لحالة الأحرف
    const books = await Book.find({
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { summary: { $regex: searchRegex } }
      ]
    });

    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ message: 'فشل البحث' });
  }
};


module.exports = {
  createBook,
  getAllBooks,
deleteBook,
updateBook,
getBookById, 
getBookWithAccess,
searchBooks

};




