// routers help to create endpoints

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter a password of at least 6 characters.' });

    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: 'Please enter the same password twice.' });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: 'An account with this email already exists.' });

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    // salt is a random string of characters
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({ 
      email: email,
      passwordHash: passwordHash,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

  
    const token = jwt.sign({
        user:savedUser._id //payload
    },process.env.JWT_SECRET,
    { expiresIn: '1h' }
  ); //signature 

    console.log(token);  
    // it is a good practice to store the token in a cookie, cookie is a small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing.
    // token is stored in a cookie so that the user can stay logged in even if they refresh the page or open a new tab but if the user closes the browser or the tab then the user will be logged out.
    // the cookie is stored in the browser and the browser will send the cookie to the server with every request.
    // if token stored in loal storage then it will be sent to the server with every request but it is not a good practice to store the token in local storage because it is vulnerable to cross site scripting attacks.
    // then where to store the token? we can store the token in a http only cookie with the secure flag set to true and the browser will only send the cookie to the server if the request is being made over https.
    // http only cookie is a cookie that cannot be accessed by client side javascript code.

    // send the token in a http only cookie

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    });


    res.status(201).json(savedUser); // Respond with the saved user data or a success message
    
}  
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});



router.post('/login',async(req,res)=>{

    try{

        const{email, password}= req.body;
        // it will take some time to find the user in the database so we will use await
        // findOne() method will find the first document that matches the filter criteria
        //  req.body is an object that contains the data submitted from the form

        if(!email || !password){
            return res.status(400).json({errorMessage:"Please enter all required fields."});
            // 400 is a bad request status code 
        }


        const existingUser = await User.findOne({email:email});

        if (!existingUser){
            return res.status(401).json({errorMessage:"Wrong email or password."});
            // 401 is an unauthorized status code
        }

        const passwordCorrect = await bcrypt.compare(password,existingUser.passwordHash);
        // compare() method will compare the password entered by the user with the hashed password stored in the database
        // what if dont write this line of code? then the user will be logged in even if the password is wrong
        
        if(!passwordCorrect){
            return res.status(401).json({errorMessage:"Wrong email or password."});
        }
        const token = jwt.sign({
            user:existingUser._id
        },process.env.JWT_SECRET);


        // send the token in a http only cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        });
    
    
        // res.status(201).json(savedUser); // Respond with the saved user data or a success message
        res.status(200).json({ token, user: { id: existingUser._id, email: existingUser.email } });

    }
    catch(err){
        res.status(500).json({ errorMessage: 'Internal Server Error' });

    }
});



router.get('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),       // expire immediately
        domain: 'gm-backend-two.vercel.app',
        path: '/',
        secure: true, 
        sameSite: 'none'          
    }).send();
});



module.exports = router;


// When a cookie is set with SameSite: 'none', it means the cookie will be sent with requests originating from any site, including cross-site requests. This allows cookies (such as your authentication token) to be included in requests between different sites or domains, which can be necessary when your frontend and backend are hosted on different domains.
// Implications for different frontend site:
// The cookie is sent by the browser on requests from your frontend site to your backend site if the backend cookie is configured with SameSite: 'none' and Secure: true.
// This is necessary for cross-origin authentication flows (e.g., frontend is at example.com and backend is at api.example.com or another domain like your Vercel deployment).
// However, enabling SameSite: 'none' also means the cookie is more exposed to potential CSRF (Cross-Site Request Forgery) attacks, because it will be sent with requests from other origins.
// To mitigate risks, httpOnly: true prevents client-side JavaScript from accessing the cookie, and additional CSRF protection strategies (like CSRF tokens or checking Origin headers) should be implemented server-side.


// Your token stored in a cookie configured this way is:
// Protected from being accessed by client-side scripts (httpOnly).
// Removed immediately on logout (expires: new Date(0)).
// Scoped and sent only for your app domain (domain) and all paths (path: '/').
// Sent only over HTTPS (secure).
// Allowed to be sent in cross-origin requests if needed (sameSite: 'none').