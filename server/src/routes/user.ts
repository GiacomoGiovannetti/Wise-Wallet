const express = require('express');

const { loginUser, signUpUser } = require('../controller/userController');

const router = express.Router();

//login

router.post('/login', loginUser);

//sign up

router.post('/signup', signUpUser);

module.exports = router;
