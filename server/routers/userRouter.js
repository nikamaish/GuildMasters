// routers helps to create endpoints


const router = require('express').Router();

router.post('/',async(req,res)=>{
    // res.send('test');
    // console.log(req.body); // it shows the data in the terminal

    try{
        const {email,password,passwordVerify} = req.body;
        // it is destructuring it is same as const email = req.body.email


    if(!email || !password || !passwordVerify)
        return res.status(400).json({errorMessage:"Please enter all required fields."});
    // it will show to the frontend , // means it is bad request

    if(password.length < 6)
    return res.status(400).json({errorMessage:"Please enter a password of at least 6 characters."});

    if(password !== passwordVerify){
        return res.send(400).json({errorMessage:"Please enter the same password twice."})
    }

    const existingUser = await User.findOne({email:email});
    if(existingUser)
    return res.status(400).json({errorMessage:"An account with this email already exists."});
    } 

    
    catch (err){
        console.error(err);
        res.status(500).send();
    }
   
})

module.exports = router;