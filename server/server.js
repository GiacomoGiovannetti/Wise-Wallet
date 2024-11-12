const app = require('./app');
const dotenv = require('dotenv');
const { dbConnection, db } = require('./config/db');

dotenv.config();

const port = process.env.PORT || 3000;

dbConnection();

db.once('connected', () => {
  app.listen(port, (req, res) => {
    console.log(`Server is listening at ${port}`);
  });
});
