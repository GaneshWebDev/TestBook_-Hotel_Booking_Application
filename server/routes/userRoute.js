const express=require('express');
const userModel=require('../models/user');
const bcrypt = require('bcrypt');
const router=express.Router();
router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const newUser=new userModel({name,email,password});
        await newUser.save();
        res.status(201).json(newUser);     
    } catch (error) {
        res.status(500).json({error:"error creating user"});
    }
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: 'Login successful',userData:user });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/getAllUsersDetails', async (req, res) => {
  try {
  const usersData = await userModel.find();
  return res.json(usersData);
  } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
  }
  });
module.exports=router;