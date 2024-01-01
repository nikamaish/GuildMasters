const express = require('express');
const app = express();
const userProfileRoute = require('./api/routes/userProfile.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://gaming-hub-98328.web.app'],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Use a single environment variable for MongoDB connection URI
// const mongoURI = process.env.MONGO_URL;

// console.log('MongoDB URL:', );

mongoose.connect('mongodb+srv://aishnikam31:wkj5bSVESR0Pm1Wv@cluster0.e4ullgj.mongodb.net/your_database_name?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
});


const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error:', err.message);
});

db.once('open', () => {
  console.log('Connected to the database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/userProfile', userProfileRoute);

app.use((req, res, next) => {
  res.status(200).json({
    message: 'App is running',
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Bad request',
  });
});

module.exports = app;
