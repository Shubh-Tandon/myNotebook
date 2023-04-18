const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//Route 1:  Create a user using: POST "/api/auth/createuser", Does not require Auth ---No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be of atleast 5 characters").isLength({ min: 5 }),
],async (req,res) => {
    let success = false;
  // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with this email exist already
    try {
      let user = await User.findOne({email : req.body.email});
      if(user) {
        return res.status(400).json({success, error : "user with this email already exist"})
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        })
        const data = {
          user : {
            id: user.id
          }
        }
        //generate token
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})
 
      } catch(error){
        console.error(error.message);
        res.status(500).send("Internal 01 Server error occured")
      }}
       )  

//Route 2:  Authenticate a user using: POST "/api/auth/login", Does not require Auth ---No login required
      
      router.post('/login', [
        body('email', "Enter a valid email").isEmail(),
        body('password', "password cannot be blank").exists(),
      ],async (req,res) => {
        let success = false;
        // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const{email, password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error : "Please try to login with corrrect credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare) {
        success = false;
        return res.status(400).json({success, error : "Please try to login with corrrect credentials"});
      }

      const data = {
        user : {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      success = true;
      res.json({success, authtoken})

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal 02 Server error occured")
      }
    }
)

        
//Route 3:  Get loggedin user details using: POST "/api/auth/getuser", Does not require Auth ---login required
router.post('/getuser',fetchuser, async (req,res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");  //-password means we did not want to extract password
  res.send(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal 03 Server error occured")
}
})

//Route 3:  Get loggedin user details using: POST "/api/auth/getuser", Does not require Auth ---login required
router.post('https://dev.29kreativ.com/recruitment/levels/',fetchuser, async (req,res) => {
try {
  const name = req.body.name;
  const code = req.body.code;
  console.log("name",name);
  console.log("code", code);
  res.status(200).send({"name": name, "code": code.toString()})
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal 03 Server error occured")
}
})






// const formData = new FormData();


// // formData.append("name",name )
// // formData.append('code', code);

// router.post('https://dev.29kreativ.com/recruitment/levels/', (req,res)=> {
//   // const name = "Shubh";
//   // const code = "3667dfe4a66089c51620ee63ed2db0c3"
//   const name = req.body.name;
//   const code = req.body.code;
//   // res.setHeader('Authorization', 'Bearer' + code)

//   console.log("name",name);
//   console.log("code", code);
//   res.status(200).send({"name": name, "code": code.toString()})
// })







module.exports = router;

// fetch('https://dev.29kreativ.com/recruitment/levels/',{
//     method: 'POST',
//     headers: {
//         'Authorization': 'Bearer' + code
//     },
//     body: formData,
// }).then(response => {
//     // response.end(JSON.stringify({name: name, code: code.toString()}))
//     console.log("name :" + name);
//     console.log("code:" + code);

// }).catch(err =>{
//     console.log(err);
// })