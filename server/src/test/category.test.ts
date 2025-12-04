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
    modifiedTestId = replaceFirstCharId(testId);
  });
  afterAll(async () => {
    await Category.deleteOne({ _id: testId });
    await dbDisconnection();
  });

  describe('POST request', () => {
    describe('given a name and userId', () => {
      it('should respond with a 201 status code and a json object containing a message and the created category', async () => {
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
    describe('if name is not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const response = await request(app).post('/api/category/create').send({
          userId: '673ce872b8c3a4b5d6dfdc88',
        });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe('name not provided');
      });
    });
    describe('if userId is not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const response = await request(app).post('/api/category/create').send({
          name: 'Test',
        });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe('userId not provided');
      });
    });
    describe('if name is not valid', () => {
      it('should respond with a 400 stuatus code and a json object containing a message', async () => {
        const response = await request(app).post('/api/category/create').send({
          name: 'Test!',
          userId: '673ce872b8c3a4b5d6dfdc88',
        });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe(
          'name can only contain alphanumeric values'
        );
      });
    });
  });
  describe('PATCH request', () => {
    describe('given a name and userId', () => {
      it('should respond with a 200 status code and a json object containing a message and the updated category', async () => {
        const response = await request(app)
          .patch(`/api/category/update/${testId}`)
          .send({
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'Category has been modified successfully'
        );
        expect(response.body.previousCategory._id).toBeDefined();
        expect(response.body.previousCategory.name).toBeDefined();
        expect(response.body.previousCategory.userId).toBeDefined();
        expect(response.body.previousCategory.createdAt).toBeDefined();
        expect(response.body.updatedCategory._id).toBeDefined();
        expect(response.body.updatedCategory.name).toBeDefined();
        expect(response.body.updatedCategory.userId).toBeDefined();
        expect(response.body.updatedCategory.createdAt).toBeDefined();
      });
    });
    describe('given a non valid categoryId', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const bodyRequests = [
          {
            name: 'Test',
            userId: '673ce872b8c3a4b5d6dfdc88',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .patch(`/api/category/update/${modifiedTestId}`)
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe(
            'No valid resource for specified ID'
          );
        }
      });
    });
    describe('if name is not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const response = await request(app)
          .patch(`/api/category/update/${testId}`)
          .send({
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe('name not provided');
      });
    });
    describe('if userId or id are not provided', () => {
      it('should respond with a 400 status code and a json object containing a message', async () => {
        const response = await request(app)
          .patch(`/api/category/update/${testId}`)
          .send({
            name: 'Test',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe('userId not provided');
      });
    });
    describe('if name is not valid', () => {
      it('should respond with a 400 stuatus code and a json object containing a message', async () => {
        const response = await request(app)
          .patch('/api/category/update/${testId}')
          .send({
            name: 'Test!',
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe(
          'name can only contain alphanumeric values'
        );
      });
    });
  });
  describe('DELETE request', () => {
    beforeEach(async () => {
      testId = await createDummyData(Category);
    });
    describe('given a valid categoryId', () => {
      it('should respond with a 200 status code and a json object containing a message and the deleted category', async () => {
        const response = await request(app).delete(
          `/api/category/delete/${testId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'Category has been deleted successfully'
        );
        expect(response.body.deletedCategory._id).toBeDefined();
        expect(response.body.deletedCategory.name).toBeDefined();
        expect(response.body.deletedCategory.userId).toBeDefined();
        expect(response.body.deletedCategory.createdAt).toBeDefined();
      });
    });
    describe('given a non valid categoryId', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).delete(
          `/api/category/delete/${modifiedTestId}`
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
  describe('GET requests', () => {
    describe('if id is provided', () => {
      it('should respond with a 200 status code and a json object containing the requested category', async () => {
        const response = await request(app).get(`/api/category/${testId}`);
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
        expect(response.body.category._id).toBeDefined();
        expect(response.body.category.name).toBeDefined();
        expect(response.body.category.userId).toBeDefined();
        expect(response.body.category.createdAt).toBeDefined();
      });
    });
    describe('if id is not valid', () => {
      it('should respond with a 404 status code and a json object containing a message', async () => {
        const response = await request(app).get(
          `/api/category/${modifiedTestId}`
        );
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(
          'No valid resource for specified ID'
        );
      });
    });
    describe('GET all requests', () => {
      describe('if userId is provided in query params', () => {
        it('should responde with a 200 status code and a json object containing a count with the number of found cateogries and array of categories', async () => {
          const response = await request(app).get('/api/category').query({
            userId: '673ce872b8c3a4b5d6dfdc88',
          });
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
          expect(response.body.count).toBeDefined();
          expect(response.body.categories).toBeDefined();
          expect(response.body.count).toBeGreaterThan(0);
          expect(response.body.categories).toBeInstanceOf(Array);
          expect(response.body.categories.length).toBeGreaterThan(0);
        });
      });
      describe('if userId is not provided', () => {
        it('should responde with a 200 status code and a json object containing a message', async () => {
          const response = await request(app).get('/api/category').query({
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
