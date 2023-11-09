const express= require('express');
const app= express();
const userProfileRoute= require('./api/routes/userProfile.js')
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');



const corsOptions ={
  origin:['http://localhost:3000','https://gaming-hub-98328.web.app' ], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));//set up route.


mongoose.connect('mongodb+srv://aishnikam31:9pCNSub3Y0ohUi0P@user.krryz2v.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log('connection failed')
})

mongoose.connection.on('connected',connected=>{
    console.log('connected with atlas...')
})



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/userProfile',userProfileRoute);

app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;