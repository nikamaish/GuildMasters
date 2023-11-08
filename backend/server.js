const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
const corsOptions ={
  origin:['http://localhost:3000' ], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}




app.use(cors(corsOptions));//set up route
app.use(cors());
// Friendsarebest@7

// Serve static files from the "frontend" directory using a relative path
app.use(express.static(path.join(__dirname, '../frontend')));

// const password = "Friendsarebest@7"; // Replace this with your actual password

// const encodedPassword = encodeURIComponent(password);
// const uri = `mongodb://aish:${encodedPassword}@userprofiledb.hexctgs.mongodb.net/?retryWrites=true&w=majority`;

// Replace the connection string with your MongoDB Atlas connection string
// const uri = "mongodb://aish:<password>@7@userprofiledb.hexctgs.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(`mongodb://aish:Friendsarebest@7@userprofiledb.hexctgs.mongodb.net/?retryWrites=true&w=majority`);

mongoose.connect('mongodb+srv://aishnikam31:9pCNSub3Y0ohUi0P@user.krryz2v.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('connected', () => {
  // 9pCNSub3Y0ohUi0P
  console.log('Connected to MongoDB Atlas');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Atlas connection error:', err);
});

// Schema for User with email and password
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Endpoint for user registration (creating a new user)
app.post('/Userprofile', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Endpoint for user login (authentication)
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email, password });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

app.get('/userProfile', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'src', 'userProfile', 'Userprofile.jsx'));
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



