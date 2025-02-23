import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//static signup method
userSchema.statics.signup = async function (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  //validation
  if (!username || !email || !password || !confirmPassword) {
    throw new Error('All fields must be filled');
  }
  if (
    !validator.matches(
      username,
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$]+$/
    )
  ) {
    throw new Error(
      'Username can contain only letters, numbers and special characters'
    );
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

  const userExists = await this.findOne({ username });

  if (userExists) {
    throw new Error('this username is already in use');
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw new Error('this email is already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });
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
