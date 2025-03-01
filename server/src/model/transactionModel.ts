import mongoose, { ObjectId, Schema } from 'mongoose';
const validator = require('validator');

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

//static function to create a transaction
transactionSchema.statics.createTransaction = async function (
  transactionType: string,
  amount: number,
  description: string,
  date: Date,
  userId: string,
  categoryId: string
) {
  //validation
  if (!transactionType || !amount || !date) {
    throw new Error('All fields must be filled');
  }
  if (!userId || !categoryId) {
    throw new Error('userId or categoryId not provided');
  }
  if (
    !validator.isCurrency(amount, {
      allow_negative: false,
      thousand_separator: '.',
      decimal_separator: ',',
      //   symbol: '',
    })
  ) {
    throw new Error('Amount is not valid');
  }

  const transaction = await this.create({
    transactionType,
    amount,
    description,
    date,
    userId,
    categoryId,
  });
  return transaction;
};

// static function to modify a transaction
transactionSchema.statics.modifyTransaction = async function (
  id: ObjectId,
  transactionType: string,
  amount: number,
  description: string,
  date: Date,
  userId: string,
  categoryId: string
) {
  //validation
  if (!transactionType || !amount || !date) {
    throw new Error('All fields must be filled');
  }
  if (!userId || !categoryId) {
    throw new Error('userId, categoryId or transactionId not provided');
  }
  if (
    !validator.isCurrency(amount, {
      allow_negative: false,
      thousand_separator: '.',
      decimal_separator: ',',
      //   symbol: '',
    })
  ) {
    throw new Error('Amount is not valid');
  }

  const transaction = await this.findByIdAndUpdate(id, {
    $set: {
      transactionType: transactionType,
      amount: amount,
      description: description,
      date: date,
      categoryId: categoryId,
      updatedAt: new Date(),
    },
  });

  const updatedTransaction = await this.findById(id);
  return { transaction, updatedTransaction };
};

//static function to delete a transaction
transactionSchema.statics.deleteTransaction = async function (id: ObjectId) {
  //validator
  if (!id) {
    throw new Error('transactionId not provided');
  }

  const deletedTransaction = await this.findByIdAndDelete(id);

  return deletedTransaction;
};

//static function to get all the transacitons
transactionSchema.statics.getAllTransactions = async function (
  userId: ObjectId
) {
  //validator
  if (!userId) {
    throw new Error('userId not provided');
  }

  const transactions = await this.find({ userId: userId });
  // .populate('categoryId', '_id name')
  // .populate('userId', '_id username');

  return transactions;
};

module.exports = mongoose.model('Transaction', transactionSchema);
