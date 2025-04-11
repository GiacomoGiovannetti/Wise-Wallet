import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  modifyTransaction,
} from '../controller/transactionController';

const router = Router();

//create trnasaction
router.post('/create', createTransaction);

// update transaction
router.patch('/update/:id', modifyTransaction);

//delete transaction
router.delete('/delete/:id', deleteTransaction);

//get transaction
router.get('/:id', getTransaction);

//get all transactions
router.get('/', getAllTransactions);
export { router as transactionRouter };
