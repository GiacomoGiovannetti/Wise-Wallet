import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryRequestType } from '../types';

const Category = require('../model/categoryModel');

//controller to create a new category
export const createCategory = async (
  req: Request<CategoryRequestType>,
  res: Response
) => {
  try {
    const { name, userId } = req.body;

    const createdCategory = await Category.createCategory(name, userId);
    res.status(StatusCodes.CREATED).json({
      message: 'Category has been created successfully',
      createdCategory: {
        _id: createdCategory._id,
        name: createdCategory.name,
        userId: createdCategory.userId,
        createdAt: createdCategory.createdAt,
      },
    });
  } catch (err: any) {
    console.error(err),
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
  }
};

//controller to modify an existing category

export const modifyCategory = async (
  req: Request<CategoryRequestType>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, userId } = req.body;

    const modifiedCategory = await Category.modifyCategory(id, name, userId);

    if (modifiedCategory) {
      res.status(StatusCodes.OK).json({
        message: 'Category has been modified successfully',
        previousCategory: {
          _id: modifiedCategory.category._id,
          name: modifiedCategory.category.name,
          userId: modifiedCategory.category.userId,
          createdAt: modifiedCategory.category.createdAt,
        },
        updatedCategory: {
          _id: modifiedCategory.updatedCategory._id,
          name: modifiedCategory.updatedCategory.name,
          userId: modifiedCategory.updatedCategory.userId,
          createdAt: modifiedCategory.updatedCategory.createdAt,
          updatedAt: modifiedCategory.updatedCategory.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.deleteCategory(id);

    if (deletedCategory) {
      res.status(StatusCodes.OK).json({
        message: 'Category has been deleted successfully',
        deletedCategory: {
          _id: deletedCategory._id,
          name: deletedCategory.name,
          userId: deletedCategory.userId,
          createdAt: deletedCategory.createdAt,
          updatedAt: deletedCategory.updatedAt,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.getCategory(id);

    if (category) {
      res.status(StatusCodes.OK).json({ category });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const categories = await Category.getAllCategories(userId);
    if (categories.length <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No valid resource for specified ID' });
    } else {
      res.status(StatusCodes.OK).json({
        count: categories.length,
        categories: categories,
      });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
