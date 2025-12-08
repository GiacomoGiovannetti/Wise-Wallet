import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  modifyCategory,
} from '../controller/categoryController';

const router = Router();

//create category
router.post('/create', createCategory);

//modify category
router.patch('/update/:id', modifyCategory);

//delete cateogory
router.delete('/delete/:id', deleteCategory);

// get category
router.get('/:id', getCategory);

//get all categories
router.get('/', getAllCategories);

export { router as categoryRouter };
