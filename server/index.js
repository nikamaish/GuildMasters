const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
// if we did not host backend on heroku then we use 5000 port

app.listen(PORT,()=> console.log(`Server started on port :${PORT}`));

app.use(express.json());
// it helps to pass the data in json format

// app.get('/test',(req,res)=>{
// res.send('It works')
// })


// console.log('MDB_URL:', process.env.MDB_URL);
// console.log('Environment Variables:', process.env);


mongoose.connect(process.env.MDB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error',(err)=>{
    console.error('Connection Error:',err.message)
});

db.once('open', () => {
    console.log('Connected to the database');
  });




// set up routes  
// it is middleware
app.use('/auth',require('./routers/userRouter'))