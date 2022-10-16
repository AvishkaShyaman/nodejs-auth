const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/dbConfig');
var glob = require('glob');
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

// ======= register routes
glob('./routes/*.route.js', {}, (err, files) => {
  files.forEach((route) => {
    const stats = fs.statSync(route);
    const fileSizeInBytes = stats.size;
    if (fileSizeInBytes) {
      require(route)(app, express);
    }
  });
});

// Static Files
app.use(express.static('public'));

// morgan http
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
