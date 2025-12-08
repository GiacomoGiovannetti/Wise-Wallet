import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BudgetAccountRequestType } from 'src/types';

const BudgetAccount = require('../model/budgetAccountModel');

//controller to create a new budgetAccount

export const createBudgetAccount = async (
  req: Request<BudgetAccountRequestType>,
  res: Response
) => {
  try {
    const { userId, name, description, currency } = req.body;

    const createdBudgetAccount = await BudgetAccount.createBudgetAccount(
      userId,
      name,
      description,
      currency
    );
    res.status(StatusCodes.CREATED).json({
      message: 'BudgetAccount has been created successfully',
      createdBudgetAccount: {
        _id: createdBudgetAccount._id,
        name: createdBudgetAccount.name,
        description: createdBudgetAccount?.description,
        currency: createdBudgetAccount?.currency,
        userId: createdBudgetAccount.userId,
        createdAt: createdBudgetAccount.createdAt,
      },
    });
  } catch (error: any) {
    console.error(error),
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
  }
};

//controller to modify an existing budget account

export const modifyBudgetAccount = async (
  req: Request<BudgetAccountRequestType>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { userId, name, description, currency } = req.body;

    const modifiedBudgetAccount = await BudgetAccount.modifyBudgetAccount(
      id,
      userId,
      name,
      description,
      currency
    );

    if (modifiedBudgetAccount) {
      res.status(StatusCodes.OK).json({
        message: 'BudgetAccounthas been modified successfully',
        previousBudgetAccount: {
          _id: modifiedBudgetAccount.budgetAccount._id,
          name: modifiedBudgetAccount.budgetAccount.name,
          description: modifiedBudgetAccount.budgetAccount?.description,
          currency: modifiedBudgetAccount.budgetAccount?.currency,
          userId: modifiedBudgetAccount.budgetAccount.userId,
          createdAt: modifiedBudgetAccount.budgetAccount.createdAt,
        },
        updatedBudgetAccount: {
          _id: modifiedBudgetAccount.updatedBudgetAccount._id,
          name: modifiedBudgetAccount.updatedBudgetAccount.name,
          description: modifiedBudgetAccount.updatedBudgetAccount?.description,
          currency: modifiedBudgetAccount.updatedBudgetAccount?.currency,
          userId: modifiedBudgetAccount.updatedBudgetAccount.userId,
          createdAt: modifiedBudgetAccount.updatedBudgetAccount.createdAt,
          updatedAt: modifiedBudgetAccount.updatedBudgetAccount.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (error: any) {
    console.error(error),
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
  }
};

//controller to delete an existing budget account

export const deleteBudgetAccount = async (
  req: Request<BudgetAccountRequestType>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedBudgetAccount = await BudgetAccount.deleteBudgetAccount(id);

    if (deletedBudgetAccount) {
      res.status(StatusCodes.OK).json({
        message: 'BudgetAccount has been deleted successfully',
        deletedBudgetAccount: {
          _id: deletedBudgetAccount._id,
          name: deletedBudgetAccount.name,
          description: deletedBudgetAccount?.description,
          currency: deletedBudgetAccount?.currency,
          userId: deletedBudgetAccount.userId,
          createdAt: deletedBudgetAccount.createdAt,
          updatedAt: deletedBudgetAccount?.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (error: any) {
    console.error(error),
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
  }
};

// controller to get a budget account

export const getBudgetAccount = async (
  req: Request<BudgetAccountRequestType>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const budgetAccount = await BudgetAccount.getBudgetAccount(id);

    if (budgetAccount) {
      res.status(StatusCodes.OK).json({
        budgetAccount: {
          _id: budgetAccount._id,
          name: budgetAccount.name,
          description: budgetAccount?.description,
          currency: budgetAccount?.currency,
          userId: budgetAccount.userId,
          createdAt: budgetAccount.createdAt,
          updatedAt: budgetAccount?.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (error: any) {
    console.error(error),
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
  }
};

//controller to get all budget accounts

export const getAllBudgetAccounts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const budgetAccounts = await BudgetAccount.getAllBudgetAccounts(userId);

    if (budgetAccounts.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resources for specified ID',
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: budgetAccounts.length,
        budgetAccounts: budgetAccounts,
      });
    }
  } catch (error: any) {
    console.error(error),
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
  }
};
