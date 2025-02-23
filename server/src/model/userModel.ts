import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (
  name: string,
  surname: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  //validation
  if (!name || !surname || !email || !password || !confirmPassword) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isAlpha(name) || !validator.isAlpha(surname)) {
    throw new Error('Name and Surname can contain only letters');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password not strong enough');
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw new Error('this email is already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, surname, email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email: string, password: string) {
  //validation
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect password');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
