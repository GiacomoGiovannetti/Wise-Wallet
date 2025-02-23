import { Request, Response } from 'express';

const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { StatusCodes } = require('http-status-codes');

const createToken: (_id: string) => string = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};
//login user
exports.loginUser = async (
  req: Request<{ email: string }, { password: string }>,
  res: Response
) => {
  try {
    let { email, password } = req.body;

    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(StatusCodes.OK).json({ email, token });
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

//sigh up user
exports.signUpUser = async (req: Request, res: Response) => {
  try {
    let { name, surname, email, password, confirmPassword } = req.body;

    const user = await User.signup(
      name,
      surname,
      email,
      password,
      confirmPassword
    );

    //create token
    const token = createToken(user._id);

    res.status(StatusCodes.OK).json({ email, token });
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
