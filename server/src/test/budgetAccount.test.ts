const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { dbConnection, dbDisconnection, db } = require('../config/db');
const { createDummyData, replaceFirstCharId } = require('./testMiddleware');

const BudgetAccount = require('../model/budgetAccountModel');

let testId: string | null = null;
let modifiedTestId: string | null = null;

describe('BudgetAccount request', () => {
  beforeAll(async () => {
    await dbConnection();
    testId = await createDummyData(BudgetAccount);
    modifiedTestId = replaceFirstCharId(testId);
  });
  afterAll(async () => {
    await BudgetAccount.deleteOne({ _id: testId });
    await dbDisconnection();
  });

  describe('POST request', () => {
    describe('given a name and userId', () => {
      it('should respond with a 201 status code and a json object containg a message and the created budgetAccount', async () => {
        const response = await request(app)
          .post('/api/budget-account/create')
          .send({
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBeDefined();
        expect(response.body.createdBudgetAccount._id).toBeDefined();
        expect(response.body.createdBudgetAccount.name).toBeDefined();
        expect(response.body.createdBudgetAccount.userId).toBeDefined();
        expect(response.body.createdBudgetAccount.description).toBeDefined();
        expect(response.body.createdBudgetAccount.currency).toBeDefined();
        expect(response.body.createdBudgetAccount.createdAt).toBeDefined();
      });
    });
    describe('name is not provided', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .post('/api/budget-account/create')
          .send({
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('name not provided');
      });
    });
    describe('userId is not provided', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const resource = await request(app)
          .post('/api/budget-account/create')
          .send({
            name: 'Test',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(resource.headers['content-type']).toContain('json');
        expect(resource.statusCode).toBe(400);
        expect(resource.body.message).toBeDefined();
        expect(resource.body.message).toBe('userId not provided');
      });
    });
    describe('name is not alphanumeric value', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .post('/api/budget-account/create')
          .send({
            name: 'Test!',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'name can only contain alphanumeric values'
        );
      });
    });
    describe('currency is not alphabetic value', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const bodyRequests = [
          {
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR!',
          },
          {
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR1',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/budget-account/create')
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'currency can only contain alphabetical values'
          );
        }
      });
    });
  });
  describe('PATCH request', () => {
    describe('given a name and userId', () => {
      it('should respond with a 200 status code and a json object containg a message, the previous budgetAccount and the updated budgetAccount', async () => {
        const response = await request(app)
          .patch(`/api/budget-account/update/${testId}`)
          .send({
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'BudgetAccounthas been modified successfully'
        );
        expect(response.body.previousBudgetAccount).toBeDefined();
        expect(response.body.previousBudgetAccount._id).toBeDefined();
        expect(response.body.previousBudgetAccount.name).toBeDefined();
        expect(response.body.previousBudgetAccount.userId).toBeDefined();
        expect(response.body.previousBudgetAccount.createdAt).toBeDefined();
        expect(response.body.updatedBudgetAccount).toBeDefined();
        expect(response.body.updatedBudgetAccount._id).toBeDefined();
        expect(response.body.updatedBudgetAccount.name).toBeDefined();
        expect(response.body.updatedBudgetAccount.userId).toBeDefined();
        expect(response.body.updatedBudgetAccount.description).toBeDefined();
        expect(response.body.updatedBudgetAccount.currency).toBeDefined();
        expect(response.body.updatedBudgetAccount.createdAt).toBeDefined();
        expect(response.body.updatedBudgetAccount.updatedAt).toBeDefined();
      });
    });
    describe('given a non valid id ', () => {
      it('should respond with a 404 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .patch(`/api/budget-account/update/${modifiedTestId}`)
          .send({
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'No valid resource for specified ID'
        );
      });
    });
    describe('name is not provided', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .patch(`/api/budget-account/update/${testId}`)
          .send({
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('name not provided');
      });
    });
    describe('userId is not provided', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .patch(`/api/budget-account/update/${testId}`)
          .send({
            name: 'test',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('userId not provided');
      });
    });
    describe('name is not alphanumeric value', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const response = await request(app)
          .patch(`/api/budget-account/update/${testId}`)
          .send({
            name: 'test!',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'name can only contain alphanumeric values'
        );
      });
    });
    describe('currency is not alphabetic value', () => {
      it('should respond with a 400 status code and a json object containg an error message', async () => {
        const bodyRequests = [
          {
            name: 'test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR!',
          },
          {
            name: 'test',
            userId: '673ce872b8c3a4b5d6dfdc88',
            description: 'Test description',
            currency: 'EUR1',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .patch(`/api/budget-account/update/${testId}`)
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'currency can only contain alphabetical values'
          );
        }
      });
    });
  });
  describe('DELETE request', () => {
    beforeEach(async () => {
      testId = await createDummyData(BudgetAccount);
    });
    describe('given a valid id', () => {
      it('should respond with a 200 status code and a json object containing a message and the deleted budgetAccount', async () => {
        const response = await request(app).delete(
          `/api/budget-account/delete/${testId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'BudgetAccount has been deleted successfully'
        );
        expect(response.body.deletedBudgetAccount._id).toBeDefined();
        expect(response.body.deletedBudgetAccount.name).toBeDefined();
        expect(response.body.deletedBudgetAccount.userId).toBeDefined();
        expect(response.body.deletedBudgetAccount.createdAt).toBeDefined();
      });
    });

    describe('given a non valid id', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).delete(
          `/api/budget-account/delete/${modifiedTestId}`
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
      it('should respond with a 200 status code and a json object containing the requested budgetAccount', async () => {
        const response = await request(app).get(
          `/api/budget-account/${testId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.budgetAccount._id).toBeDefined();
        expect(response.body.budgetAccount.name).toBeDefined();
        expect(response.body.budgetAccount.userId).toBeDefined();
        expect(response.body.budgetAccount.createdAt).toBeDefined();
      });
    });
    describe('given a non valid id', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).get(
          `/api/budget-account/${modifiedTestId}`
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
        it('should responde with a 200 status code and a json object containing a count with the number of found budgetAccounts and array of budgetAccounts', async () => {
          const response = await request(app).get('/api/budget-account').query({
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
          expect(response.body.count).toBeDefined();
          expect(response.body.budgetAccounts).toBeDefined();
          expect(response.body.count).toBeGreaterThan(0);
          expect(response.body.budgetAccounts).toBeInstanceOf(Array);
          expect(response.body.budgetAccounts.length).toBeGreaterThan(0);
        });
      });
      describe('given a non valid userId', () => {
        it('should responde with a 404 status code and a json object containing a message', async () => {
          const response = await request(app).get('/api/budget-account').query({
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
