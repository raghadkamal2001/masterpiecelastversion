// const express = require('express');
// const { createBook,getAllBooks,deleteBook,updateBook,getBookById } = require('../controllers/bookController');


// const router = express.Router();

// router.post('/books', createBook); // POST /api/books


// router.get('/', getAllBooks);
// router.get('/:id', getBookById);
// router.delete('/:id', deleteBook);
// router.put('/:id', updateBook);

// module.exports = router;




const express = require('express');
const { createBook,getAllBooks,deleteBook,updateBook,getBookById } = require('../controllers/bookController');
const { searchBooks } = require('../controllers/bookController');


const router = express.Router();

router.post('/books', createBook); // POST /api/books

router.get('/search/books', searchBooks); 
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

module.exports = router;

