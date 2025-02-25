const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty().isLength({ min: 2 }),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
