const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { dbConnection, dbDisconnection, db } = require('../config/db');
const {
  createDummyData,
  replaceFirstCharId,
  createDummyUser,
} = require('./testMiddleware');

const User = require('../model/userModel');

let testId: string | null = null;
let modifiedTestId: string | null = null;

describe('User request', () => {
  beforeAll(async () => {
    await dbConnection();
    testId = await createDummyUser(User);
    modifiedTestId = await replaceFirstCharId(testId);
  });
  afterAll(async () => {
    await User.deleteOne({ _id: testId });
    await dbDisconnection();
  });

  describe('Sign up requests', () => {
    describe('given a name and userId', () => {
      it('should respond with a 201 status code and a json object containg a message and the created user', async () => {
        const response = await request(app).post('/api/user/signup').send({
          username: 'prova.',
          email: 'test@example.com',
          password: 'Password1!',
          confirmPassword: 'Password1!',
        });
        expect(response.headers['content-type']).toContain('json');
        expect(response.body.email).toBe('test@example.com'); // Verifica che l'email sia quella corretta
        expect(response.body.token).toBeDefined(); // Verifica che il token sia presente
        expect(response.body.password).not.toBeDefined(); // La password non deve essere restituita
        expect(response.statusCode).toBe(201);
      });
    });
    describe('if username or passowrd or email or confirmPassword are no provided', () => {
      it('should respond with a 500 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'password',
          },
          {
            email: 'Qp2uF@example.com',
            password: 'password',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            password: 'password',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            confirmPassword: 'password',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signup')
            .send(bodyRequest);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('All fields must be filled');
        }
      });
    });
    describe(`if username doesn't contain only letters, numbers and special characters(._-)`, () => {
      it('should respond with a 500 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            username: 'Test!',
            email: 'Qp2uF@example.com',
            password: 'password',
            confirmPassword: 'password',
          },
          {
            username: 'T€st$',
            email: 'Qp2uF@example.com',
            password: 'password',
            confirmPassword: 'password',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signup')
            .send(bodyRequest);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe(
            'Username can contain only letters, numbers and special characters(.-_)'
          );
        }
      });
    });
    describe(`if the password is not strong enough`, () => {
      it('should respond with a 500 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'password',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'password1',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'password!',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'password1!',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password!',
            confirmPassword: 'password',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signup')
            .send(bodyRequest);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('Password not strong enough');
        }
      });
    });
    describe(`if the password and the confirm password do not match`, () => {
      it('should respond with a 500 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'password1',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'password1!',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'password!',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'Password',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'Password1',
          },
          {
            username: 'Test',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'Password!',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signup')
            .send(bodyRequest);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('Passwords do not match');
        }
      });
    });
    describe(`if the username is already in use`, () => {
      it('should respond with a 500 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            username: 'UserTest',
            email: 'Qp2uF@example.com',
            password: 'Password1!',
            confirmPassword: 'Password1!',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signup')
            .send(bodyRequest);
          expect(response.statusCode).toBe(400);
          expect(response.headers['content-type']).toContain('json');
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('This username is already in use');
        }
      });
    });
  });

  describe('Sign in requests', () => {
    describe('given a username and password', () => {
      it('should respond with a 200 status code and a json object containg the email and the token', async () => {
        const response = await request(app).post('/api/user/signin').send({
          email: 'test@example.com',
          password: 'Password1!',
        });
        expect(response.headers['content-type']).toContain('json');
        expect(response.body.email).toBeDefined();
        expect(response.body.email).toBe('test@example.com'); // Verifica che l'email sia quella corretta
        expect(response.body.token).toBeDefined(); // Verifica che il token sia presente
        expect(response.body.password).not.toBeDefined(); // La password non deve essere restituita
        expect(response.statusCode).toBe(200);
      });
    });
    describe('if email or password are not provided', () => {
      it('should respond with a 400 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            email: 'user@test.it',
          },
          {
            password: 'prova123!',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signin')
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('All fields must be filled');
        }
      });
    });
    describe('if email is not valid', () => {
      it('should respond with a 400 status code and a json object containg a message', async () => {
        const bodyRequests = [
          {
            email: 'user@test',
            password: 'prova123!',
          },
          {
            email: 'user@test.',
            password: 'prova123!',
          },
          {
            email: 'user@test..it',
            password: 'prova123!',
          },
          {
            email: 'user1@test.it',
            password: 'prova123!',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signin')
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('Incorrect email');
        }
      });
    });
    describe('if password is not valid', () => {
      it('should respond with a 400 status cose and a json object containg a message', async () => {
        const bodyRequests = [
          {
            email: 'user@test.it',
            password: 'prova',
          },
          {
            email: 'user@test.it',
            password: 'prova123',
          },
          {
            email: 'user@test.it',
            password: 'Prova123!',
          },
        ];
        for (const bodyRequest of bodyRequests) {
          const response = await request(app)
            .post('/api/user/signin')
            .send(bodyRequest);
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toBe('Incorrect password');
        }
      });
    });
  });
});
