// // routes/dashboardRoutes.js
// const express = require('express');
// const router = express.Router();
// const dashboardController = require('../controllers/dashboardController');

// router.get('/stats', dashboardController.getStats);
// router.get('/latest-sales', dashboardController.getLatestSales);
// router.get('/top-books', dashboardController.getTopBooks);

// module.exports = router;



// routes/dashboard.js
const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getStats);

module.exports = router;
