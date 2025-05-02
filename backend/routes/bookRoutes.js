const express = require('express');
const { createBook } = require('../controllers/bookController');


const router = express.Router();

router.post('/books', createBook); // POST /api/books

module.exports = router;

