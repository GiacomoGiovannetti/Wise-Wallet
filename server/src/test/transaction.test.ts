const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { dbConnection, dbDisconnection, db } = require('../config/db');
const {
  createDummyData,
  replaceFirstCharId,
  createDummyTransaction,
} = require('./testMiddleware');

const BudgetAccount = require('../model/budgetAccountModel');
const Category = require('../model/categoryModel');
const Transaction = require('../model/transactionModel');

let transactionTestId: string | null = null;
let categoryTestId: string | null = null;
let budgetAccountTestId: string | null = null;
let modifiedTransactionTestId: string | null = null;
let modifiedCategoryTestId: string | null = null;
let modifiedBudgetAccountTestId: string | null = null;

describe('Transaction request', () => {
  beforeAll(async () => {
    dbConnection();
    categoryTestId = await createDummyData(Category);
    budgetAccountTestId = await createDummyData(BudgetAccount);
    transactionTestId = await createDummyTransaction(
      Transaction,
      '673ce872b8c3a4b5d6dfdc88',
      categoryTestId
    );
    modifiedTransactionTestId = await replaceFirstCharId(transactionTestId);
    modifiedCategoryTestId = await replaceFirstCharId(categoryTestId);
    modifiedBudgetAccountTestId = await replaceFirstCharId(budgetAccountTestId);
  });
  afterAll(async () => {
    await dbDisconnection();
  });

  describe('POST request', () => {
    afterAll(async () => {
      await Transaction.deleteOne({ _id: transactionTestId });
    });
    describe('given an amount, transactionType, date, userId and categoryId', () => {
      it('should respond with a 201 status code and a json object containg a message and the created transaction', async () => {
        const response = await request(app)
          .post('/api/transaction/create')
          .send({
            transactionType: 'income',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBeDefined();
        expect(response.body.createdTransaction._id).toBeDefined();
        expect(response.body.createdTransaction.transactionType).toBeDefined();
        expect(response.body.createdTransaction.amount).toBeDefined();
        expect(response.body.createdTransaction.description).toBeDefined();
        expect(response.body.createdTransaction.date).toBeDefined();
        expect(response.body.createdTransaction.userId).toBeDefined();
        expect(response.body.createdTransaction.categoryId).toBeDefined();
        expect(response.body.createdTransaction.createdAt).toBeDefined();
      });
    });
    describe('if userId or categoryId are not provided', () => {
      it('should respond with a 500 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            transactionType: 'income',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
          },
          {
            transactionType: 'income',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            transactionType: 'income',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
          },
        ];
        for (let body of bodyRequests) {
          const response = await request(app)
            .post('/api/transaction/create')
            .send(body);
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'userId or categoryId not provided'
          );
        }
      });
    });
    describe('if all required fields are not provided', () => {
      it('should send a resposnse with a 500 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            transactionType: 'income',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            transactionType: 'income',
            amount: '100',
            description: 'prova',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            amount: '100',
            description: 'prova',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            transactionType: 'income',
            description: 'prova',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            description: 'prova',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
        ];

        for (let body of bodyRequests) {
          const response = await request(app)
            .post('/api/transaction/create')
            .send(body);
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe('All fields must be filled');
        }
      });
    });
    describe('if amount is not valid', () => {
      it('it should send a response with a 500 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            transactionType: 'income',
            amount: 'prova',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            transactionType: 'income',
            amount: '-115',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
        ];
        for (let body of bodyRequests) {
          const response = await request(app)
            .post('/api/transaction/create')
            .send(body);
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe('Amount is not valid');
        }
      });
    });
  });
});
