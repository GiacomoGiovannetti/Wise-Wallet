import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TransactionRequestType } from '../types';
// import { Transaction } from '../model/transactionModel';
const Transaction = require('../model/transactionModel');

//Controller to create a new transaction
export const createTransaction = async (
  req: Request<TransactionRequestType>,
  res: Response
) => {
  try {
    const { transactionType, amount, description, date, userId, categoryId } =
      req.body;
    const createdTransaction = await Transaction.createTransaction(
      transactionType,
      amount,
      description,
      date,
      userId,
      categoryId
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Transaction has been created successfully',
      createdTransaction: {
        _id: createdTransaction._id,
        transactionType: createdTransaction.transactionType,
        amount: createdTransaction.amount,
        description: createdTransaction.description,
        date: createdTransaction.date,
        userId: createdTransaction.userId,
        categoryId: createdTransaction.categoryId,
        createdAt: createdTransaction.createdAt,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

//Controller to modify a new transaction
export const modifyTransaction = async (
  req: Request<TransactionRequestType>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { transactionType, amount, description, date, userId, categoryId } =
      req.body;
    const modifiedTransaction = await Transaction.modifyTransaction(
      id,
      transactionType,
      amount,
      description,
      date,
      userId,
      categoryId
    );

    if (modifiedTransaction) {
      res.status(StatusCodes.OK).json({
        message: 'Transaction has been successfully updated',
        previousTransaction: {
          _id: modifiedTransaction.transaction._id,
          transactionType: modifiedTransaction.transaction.transactionType,
          amount: modifiedTransaction.transaction.amount,
          description: modifiedTransaction.transaction.description,
          date: modifiedTransaction.transaction.date,
          userId: modifiedTransaction.transaction.userId,
          categoryId: modifiedTransaction.transaction.categoryId,
          createdAt: modifiedTransaction.transaction.createdAt,
          updatedAt: modifiedTransaction.transaction.updatedAt,
        },
        updatedTransaction: {
          _id: modifiedTransaction.updatedTransaction._id,
          transactionType:
            modifiedTransaction.updatedTransaction.transactionType,
          amount: modifiedTransaction.updatedTransaction.amount,
          description: modifiedTransaction.updatedTransaction.description,
          date: modifiedTransaction.updatedTransaction.date,
          userId: modifiedTransaction.updatedTransaction.userId,
          categoryId: modifiedTransaction.updatedTransaction.categoryId,
          createdAt: modifiedTransaction.updatedTransaction.createdAt,
          updatedAt: modifiedTransaction.updatedTransaction.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified id',
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.deleteTransaction(id);
    if (deletedTransaction) {
      res.status(StatusCodes.OK).json({
        message: 'Course has been deleted successfully',
        deletedCourse: {
          _id: deletedTransaction._id,
          transactionType: deletedTransaction.transactionType,
          amount: deletedTransaction.amount,
          description: deletedTransaction.description,
          date: deletedTransaction.date,
          userId: deletedTransaction.userId,
          categoryId: deletedTransaction.categoryId,
          createdAt: deletedTransaction.createdAt,
          updatedAt: deletedTransaction.updatedAt,
        },
      });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No valid resource for specified ID' });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

// controller to get all the transactions of a use from the db and send them to the client
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const transactions = await Transaction.getAllTransactions(userId);
    if (transactions.length <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No valid resource for specified ID' });
    } else {
      res.status(StatusCodes.OK).json({
        count: transactions.length,
        transactions: transactions,
      });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
