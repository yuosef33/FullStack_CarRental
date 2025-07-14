const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllMessages,
} = require('../controllers/contactController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.post('/', submitContactForm);


router.get('/', authMiddleware, adminMiddleware, getAllMessages);



module.exports = router;
