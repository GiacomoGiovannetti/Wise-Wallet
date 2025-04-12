const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { dbConnection, dbDisconnection, db } = require('../config/db');
const { createDummyData, replaceFirstCharId } = require('./testMiddleware');

const Category = require('../model/categoryModel');

let testId: string | null = null;
let modifiedTestId: string | null = null;

describe('Category request', () => {
  beforeAll(async () => {
    await dbConnection();
    testId = await createDummyData(Category);
    modifiedTestId = await replaceFirstCharId(testId);
  });
  afterAll(async () => {
    await dbDisconnection();
  });

  describe('POST request', () => {
    afterAll(async () => {
      await Category.deleteOne({ _id: testId });
    });
    describe('given a name and userId', () => {
      it('should respond with a 201 status code and a json object containg a message and the created category', async () => {
        const response = await request(app).post('/api/category/create').send({
          name: 'Test',
          userId: '673ce872b8c3a4b5d6dfdc88',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBeDefined();
        expect(response.body.createdCategory._id).toBeDefined();
        expect(response.body.createdCategory.name).toBeDefined();
        expect(response.body.createdCategory.userId).toBeDefined();
        expect(response.body.createdCategory.createdAt).toBeDefined();
      });
    });
  });
});
