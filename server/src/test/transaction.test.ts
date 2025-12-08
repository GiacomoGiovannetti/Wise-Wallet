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
    modifiedTransactionTestId = replaceFirstCharId(transactionTestId);
    modifiedCategoryTestId = replaceFirstCharId(categoryTestId);
    modifiedBudgetAccountTestId = replaceFirstCharId(budgetAccountTestId);
  });
  afterAll(async () => {
    await Transaction.deleteOne({ _id: transactionTestId });
    await dbDisconnection();
  });

  describe('POST request', () => {
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
      it('should respond with a 400 status code and a json object containing a message', async () => {
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
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'userId or categoryId not provided'
          );
        }
      });
    });
    describe('if all required fields are not provided', () => {
      it('should send a resposnse with a 400 status code and a json object containing a message', async () => {
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
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe('All fields must be filled');
        }
      });
    });
    describe('if amount is not valid', () => {
      it('it should send a response with a 400 status code and a json object containing a message', async () => {
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
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe('Amount is not valid');
        }
      });
    });
  });

  describe('PATCH request', () => {
    describe('given an amount, transactionType, date, userId and categoryId', () => {
      it('should respond with a 200 status code and a json object containg a message and the modified transaction', async () => {
        const response = await request(app)
          .patch(`/api/transaction/update/${transactionTestId}`)
          .send({
            transactionType: 'expense',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'Transaction has been successfully updated'
        );
        expect(response.body.previousTransaction._id).toBeDefined();
        expect(response.body.previousTransaction.transactionType).toBeDefined();
        expect(response.body.previousTransaction.amount).toBeDefined();
        expect(response.body.previousTransaction.description).toBeDefined();
        expect(response.body.previousTransaction.date).toBeDefined();
        expect(response.body.previousTransaction.userId).toBeDefined();
        expect(response.body.previousTransaction.categoryId).toBeDefined();
        expect(response.body.previousTransaction.createdAt).toBeDefined();
        expect(response.body.updatedTransaction._id).toBeDefined();
        expect(response.body.updatedTransaction.transactionType).toBeDefined();
        expect(response.body.updatedTransaction.amount).toBeDefined();
        expect(response.body.updatedTransaction.description).toBeDefined();
        expect(response.body.updatedTransaction.date).toBeDefined();
        expect(response.body.updatedTransaction.userId).toBeDefined();
        expect(response.body.updatedTransaction.categoryId).toBeDefined();
        expect(response.body.updatedTransaction.createdAt).toBeDefined();
        expect(response.body.updatedTransaction.updatedAt).toBeDefined();
      });
    });
    describe('given a non valid transactionId', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app)
          .patch(`/api/transaction/update/${modifiedTransactionTestId}`)
          .send({
            transactionType: 'expense',
            amount: '100',
            description: 'prova',
            date: '11/12/2025',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'No valid resource for specified ID'
        );
      });
    });

    describe('if at least one field is not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const response = await request(app)
          .patch(`/api/transaction/update/${transactionTestId}`)
          .send({
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          });
        expect(response.statusCode).toBe(400);
        expect(response.headers['content-type']).toContain('json');
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'At least one field must be present'
        );
      });
    });

    describe('if userId or categoryId are not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            amount: '100',
            userId: '673ce872b8c3a4b5d6dfdc88',
          },
          {
            transactionType: 'income',
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
            .patch(`/api/transaction/update/${transactionTestId}`)
            .send(body);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'userId or categoryId not provided'
          );
        }
      });
    });

    describe('if amount is not valid', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            amount: 'prova',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
          {
            amount: '-115',
            userId: '673ce872b8c3a4b5d6dfdc88',
            categoryId: '673ce872b8c3a4b5d6dfdc00',
          },
        ];
        for (let body of bodyRequests) {
          const response = await request(app)
            .patch(`/api/transaction/update/${transactionTestId}`)
            .send(body);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe('Amount is not valid');
        }
      });
    });
  });

  describe('DELETE request', () => {
    beforeEach(async () => {
      transactionTestId = await createDummyTransaction(
        Transaction,
        '673ce872b8c3a4b5d6dfdc88',
        categoryTestId
      );
    });
    describe('given a valid id', () => {
      it('should respond with a 200 status code and a json object containing a message and the deleted transaction', async () => {
        const response = await request(app).delete(
          `/api/transaction/delete/${transactionTestId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'Transaction has been deleted successfully'
        );
        expect(response.body.deletedTransaction._id).toBeDefined();
        expect(response.body.deletedTransaction.transactionType).toBeDefined();
        expect(response.body.deletedTransaction.amount).toBeDefined();
        expect(response.body.deletedTransaction.description).toBeDefined();
        expect(response.body.deletedTransaction.date).toBeDefined();
        expect(response.body.deletedTransaction.userId).toBeDefined();
        expect(response.body.deletedTransaction.categoryId).toBeDefined();
        expect(response.body.deletedTransaction.createdAt).toBeDefined();
      });
    });

    describe('given an invalid id', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).delete(
          `/api/transaction/delete/${modifiedTransactionTestId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'No valid resource for specified ID'
        );
      });
    });
  });

  describe('GET request', () => {
    describe('given a valid id', () => {
      it('should respond with a 200 status code and a json object containing the requested transaction', async () => {
        const response = await request(app).get(
          `/api/transaction/${transactionTestId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.transaction._id).toBeDefined();
        expect(response.body.transaction.transactionType).toBeDefined();
        expect(response.body.transaction.amount).toBeDefined();
        expect(response.body.transaction.description).toBeDefined();
        expect(response.body.transaction.date).toBeDefined();
        expect(response.body.transaction.userId).toBeDefined();
        expect(response.body.transaction.categoryId).toBeDefined();
        expect(response.body.transaction.createdAt).toBeDefined();
      });
    });

    describe('given an invalid id', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).get(
          `/api/transaction/${modifiedTransactionTestId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'No valid resource for specified ID'
        );
      });
    });

    describe('GET all request', () => {
      describe('if userId is provided in query params', () => {
        it('should responde with a 200 status code and a json object containing a count with the number of found transactions and array of transactions', async () => {
          const response = await request(app).get('/api/transaction').query({
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
          expect(response.body.count).toBeDefined();
          expect(response.body.transactions).toBeDefined();
          expect(response.body.count).toBeGreaterThan(0);
          expect(response.body.transactions).toBeInstanceOf(Array);
          expect(response.body.transactions.length).toBeGreaterThan(0);
        });
      });

      describe('given a non valid userId', () => {
        it('should responde with a 404 status code and a json object containing a message', async () => {
          const response = await request(app).get('/api/transaction').query({
            userId: 'a73ce872b8c3a4b5d6dfdc88',
          });
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'No valid resources for specified ID'
          );
        });
      });
    });
  });
});
