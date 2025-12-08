import { Router } from 'express';
import {
  createBudgetAccount,
  deleteBudgetAccount,
  getAllBudgetAccounts,
  getBudgetAccount,
  modifyBudgetAccount,
} from '../controller/budgetAccountController';

const router = Router();

//create category
router.post('/create', createBudgetAccount);

//modify category
router.patch('/update/:id', modifyBudgetAccount);

//deleteCategory
router.delete('/delete/:id', deleteBudgetAccount);

// get category
router.get('/:id', getBudgetAccount);

//get all categories
router.get('/', getAllBudgetAccounts);

export { router as budgetAccountRouter };
