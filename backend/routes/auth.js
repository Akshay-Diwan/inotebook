const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser')

const JWT_SECRET="thisisakshay";
router.post('/createUser',[
    body('email').isEmail(),                //validating email,name and password
    body('name').isLength({min: 3}),
    body('password').isLength({min: 5})
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);       //validationResult(req) returns array od
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user =await User.findOne({email: req.body.email});
    console.log("user: " + user);
    if(user){
        return res.status(400).json({"error": "there exists a user with same email id"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        username: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data = {
        user:{
            id: user.id
        }
        
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});
    }
    catch(error){
        console.log(error.message);
    }
  }) 

  //Authenticate a user
router.post('/login',[
    body('email').isEmail(),

], async (req, res)=>{
    console.log(req.body);
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    const {email, password} = req.body;
    try{
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "invalid credentials"});
    }
    console.log(user);
    const comparePass = await bcrypt.compare(password, user.password);
    if(!comparePass){
        return res.status(400).json({error: "invalid credentials"});
    }
    const data = {
        user:{
            id : user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});
}
catch(error){
    return res.status(500).json({error: "Internal Server Error"});
}
})

router.post('/getuser',fetchUser, async (req, res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        console.log(error);
    }
});
  module.exports = router;