const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../node_modules/config');
const auth = require('../../middleware/auth')
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');

//Get user modal
const User = require('../../models/user');

// @route   GET api/getuser
// @desc    Get login
// @access  Private
router.get('/getuser', auth, 
async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
});

// @router POST api/users/register
// @desc Register User
// @access public
router.post('/register', [
    //check name
    body('name').not().isEmpty(),
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Please enter a password')
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const{ name, email, password} = req.body;
    try {
      console.log(email);
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({msg : 'user already exists'})
        }
        else{
          const avatar = gravatar.url(email, {
            s:'200',//size
            r:'pg',//rating
            d:'mm'//default
          });
         
          const user = new User({
            name,
            email,
            password,
            avatar
        });
        //hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
       
        const payload = {
        user:{
          id:user.id
        },};

        jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 360000
        }, (error, token) =>{
          if(error) throw error;
          res.json({token});
        });

        }
        
    } catch (error) {
        console.error(error.message);
        res.status(400).send('server Error');
    }
});



// @router POST api/users/login
// @desc Login User
// @access public
router.post('/login', [
  // username must be an email
  body('email','Please add a Valid Email id').isEmail(),
  // password must be at least 5 chars long
  body('password', 'Please enter the password').exists()
  ],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;

  try {
      let user = await User.findOne({email});
      if(!user){
          return res.status(400).json({msg : 'user is not register'})
      }

      const isMatch = await  bcrypt.compare(password, user.password);
      if(!isMatch){
          return res.status(400).json({msg : 'Password is invalid'})
      }
      const payload = {
          user:{
              id:user.id
          }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 360000
      }, (error, token) =>{
          if(error) throw error;
          res.json({token});
      });
  
  } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
  }
  });

module.exports = router