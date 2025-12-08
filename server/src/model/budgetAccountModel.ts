import mongoose, { ObjectId, Schema } from 'mongoose';

const validator = require('validator');

const budgetAccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

//static function to create a budget account
budgetAccountSchema.statics.createBudgetAccount = async function (
  userId: string,
  name: string,
  description: string,
  currency: string
) {
  if (!name) {
    throw new Error('name not provided');
  }
  if (!userId) {
    throw new Error('userId not provided');
  }
  if (!validator.isAlphanumeric(name)) {
    throw new Error('name can only contain alphanumeric values');
  }
  if (!validator.isAlpha(currency)) {
    throw new Error('currency can only contain alphabetical values');
  }

  const budgetAccount = await this.create({
    name,
    userId,
    description,
    currency,
  });

  return budgetAccount;
};

// static function to modify a budget account

budgetAccountSchema.statics.modifyBudgetAccount = async function (
  id: ObjectId,
  userId: string,
  name: string,
  description: string,
  currency: string
) {
  if (!name) {
    throw new Error('name not provided');
  }
  if (!userId) {
    throw new Error('userId not provided');
  }
  if (!validator.isAlphanumeric(name)) {
    throw new Error('name can only contain alphanumeric values');
  }
  if (currency && !validator.isAlpha(currency)) {
    throw new Error('currency can only contain alphabetical values');
  }

  const budgetAccount = await this.findByIdAndUpdate(id, {
    $set: {
      name: name,
      description: description,
      currency: currency,
      updatedAt: new Date(),
    },
  });

  if (!budgetAccount) {
    return null;
  }

  const updatedBudgetAccount = await this.findById(id);

  return { budgetAccount, updatedBudgetAccount };
};

//static function to delete a category
budgetAccountSchema.statics.deleteBudgetAccount = async function (
  id: ObjectId
) {
  if (!id) {
    throw new Error('budgetAccountId not provided');
  }

  const budgetAccount = await this.findByIdAndDelete(id);

  return budgetAccount;
};

//static function to get a single budgetAccount
budgetAccountSchema.statics.getBudgetAccount = async function (id: ObjectId) {
  if (!id) {
    throw new Error('budgetAccountId not provided');
  }

  const budgetAccount = await this.findById(id).populate(
    'userId',
    '_id username'
  );

  return budgetAccount;
};

//static function to get all the budget accounts
budgetAccountSchema.statics.getAllBudgetAccounts = async function (
  userId: string
) {
  if (!userId) {
    throw new Error('userId not provided');
  }

  const budgetAccounts = await this.find({ userId: userId }).populate(
    'userId',
    '_id username'
  );

  return budgetAccounts;
};

module.exports = mongoose.model('BudgetAccount', budgetAccountSchema);
