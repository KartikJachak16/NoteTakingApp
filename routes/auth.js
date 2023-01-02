const express = require("express");
const User = require("../models/User");
const router = express.Router();
// const multer = require("multer");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "hehehehehe";

// Create User Route
router.post('/createuser', [
    body('firstname').isLength({ min: 3 }),
    body('lastname').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check whether user exists
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({ error: "Sorry Invaild Entry"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create User
        user = await User.create({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: secPass,
          });

          const data = {
            user:{
                id: user.id
            }
          }

          const authtoken = jwt.sign(data, JWT_SECRET)
        //   console.log(authtoken)
          res.json({authtoken});

        //  res.json(user);  
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
    }
    
})

// Authenticate a user using Post:/api/auth/Login

router.post('/login', [
  body('email', "Please Enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists(),
  ], async (req, res) => {
    let success = false;
    // Check for errors and bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      if (!user){
        return res.status(400).json({error: "Please try to login with correct credentials"})
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare){
        success = false;
        return res.status(400).json({ error: "Please try to login with correct credentials"})
      }

      const data = {
        user:{
            id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET)
      success = true;
      res.json({success ,authtoken})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");      
    }
  })


  // Get Loggedin User Details using : POST "/api/auth/getuser". Login
  router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
  module.exports = router

