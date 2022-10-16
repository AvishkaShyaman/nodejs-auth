const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/dbConfig');
const fs = require('fs');

// env config
dotenv.config();

// DB Connection
connectDB();

const app = express();

// CORS
app.use(cors());

// Body Parser
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// morgan http
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
