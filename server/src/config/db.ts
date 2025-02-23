import mongoose from 'mongoose';
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

//declaring in a shorter way env vars
const envVars = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  dbName: process.env.DB_NAME,
};

const dbURI = `mongodb+srv://${envVars.user}:${envVars.password}@${envVars.cluster}.${envVars.dbName}/?retryWrites=true&w=majority&appName=WiseWallet`;
let mockDb: any = null;

//connection to database via URI
const dbConnection = async () => {
  try {
    //checks if node is in test env, if it is connects the server to a mock db
    if (process.env.NODE_ENV === 'test') {
      mockDb = await MongoMemoryServer.create();
      const uri = mockDb.getUri();
      mongoose.connect(uri);
    } else {
      mongoose.connect(dbURI);
    }
  } catch (error) {
    console.error('Error during db connection:  ', error);
  }
};

let db = mongoose.connection;

const dbDisconnection = async () => {
  try {
    await mongoose.connection.close();
    if (mockDb) {
      await mockDb.stop();
    }
  } catch (error) {
    console.error('Error during db disconnection: ', error);
  }
};

db.once('connected', () => {
  console.log('Connection to db completed');
});

db.on('error', (err: any) => {
  console.error('Failed to connect to db - Server is not listening: ', err);
});

module.exports = { dbDisconnection, dbConnection, db };
