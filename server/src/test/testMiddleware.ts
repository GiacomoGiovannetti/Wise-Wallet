import { Model } from 'mongoose';
const bcrypt = require('bcrypt');

interface TransactionModel {
  userId: string;
  transactionType: string;
  amount: number;
  categoryId: string;
  date: Date;
  description?: string;
}

interface CategoryModel {
  name: string;
  userId: string;
}

interface BudgetAccountModel {
  userId: string;
  name: string;
  description?: string;
  currency?: string;
}

interface UserModel {
  username: string;
  email: string;
  password: string;
}

//function to create a dummy resource for testing purposes
exports.createDummyData = async (
  model: Model<CategoryModel, BudgetAccountModel>
) => {
  const dummyData = new model({
    name: 'Test',
    userId: '673ce872b8c3a4b5d6dfdc88',
  });

  const response = await dummyData.save();
  const testId = response._id.toHexString();
  return testId;
};

exports.createDummyUser = async (model: Model<UserModel>) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('prova123!', salt);

  const dummyUser = new model({
    username: 'UserTest',
    email: 'user@test.it',
    password: hashedPassword,
  });

  const response = await dummyUser.save();
  const testUserId = response._id.toHexString();
  return testUserId;
};

exports.createDummyTransaction = async (
  model: Model<TransactionModel>,
  userId: string,
  categoryId: string
) => {
  const dummyCourse = new model({
    amount: 2500,
    userId: userId,
    categoryId: categoryId,
    description: 'Test transaction',
    date: new Date(),
    transactionType: Math.random() < 0.5 ? 'income' : 'expense',
  });

  const response = await dummyCourse.save();
  const testCourseId = response._id.toHexString();
  return testCourseId;
};

//function to modify the Id of the test resource to generate a not found error
exports.replaceFirstCharId = (testId: string) => {
  try {
    const firstChar = testId.charAt(0);
    const charsRegex = /^a-zA-Z$/;
    let modifiedTestId;
    if (charsRegex.test(firstChar)) {
      modifiedTestId = testId.replace(firstChar, '1');
    } else {
      modifiedTestId = testId.replace(firstChar, 'a');
    }
    return modifiedTestId;
  } catch (error) {
    console.log('error', error);
  }
};
