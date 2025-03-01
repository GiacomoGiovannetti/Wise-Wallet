import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  modifyTransaction,
} from '../controller/transactionController';

const router = express.Router();

//create trnasaction
router.post('/create', createTransaction);

// update transaction
router.patch('/update/:id', modifyTransaction);

//delete transaction
router.delete('/delete/:id', deleteTransaction);

//get all transactions
router.get('/', getAllTransactions);
export { router as transactionRouter };
