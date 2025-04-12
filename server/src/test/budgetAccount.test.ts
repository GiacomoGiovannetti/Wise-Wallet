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
    modifiedTestId = await replaceFirstCharId(testId);
  });
  afterAll(async () => {
    await dbDisconnection();
  });

  describe('POST request', () => {
    afterAll(async () => {
      await BudgetAccount.deleteOne({ _id: testId });
    });
    describe('given a name and userId', () => {
      it('should respond with a 201 status code and a json object containg a message and the created budgetAccount', async () => {
        const response = await request(app)
          .post('/api/budgetAccount/create')
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
  });
});
