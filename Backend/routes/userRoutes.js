const express = require('express');
const router = express.Router();
const { signUp, login, editAccount } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', signUp);
router.post('/login', login);


router.put('/:id', authMiddleware, editAccount);

module.exports = router;
 

