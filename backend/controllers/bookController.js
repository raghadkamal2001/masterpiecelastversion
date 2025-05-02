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

module.exports = {
  createBook
};
