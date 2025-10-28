const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');

router.post('/new', authController.registerUser);
router.post('/login', authController.login);
router.get('/:id', userController.getUserInfos);
router.post('/sets/modify', userController.modifySets);

module.exports = router;