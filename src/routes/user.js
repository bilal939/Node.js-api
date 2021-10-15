const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const verify = require('../Middleware/verify');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/test";






router.post('/logout', verify,async(req,res)=>{
  if (!verify) {
    res.status(400).send("Invalid token")
  } else {
    
     const data = await User.findOne({"tokens":""});
     console.log(data)
     const newdata = data.filter(item => {
     })
     console.log(newdata)
     res.status(200).send("valid token")

  }
})


//Read All the Data
router.get('/', async (req, res) => {
  try {
    const getdata = await User.find();
    res.send(getdata);
  }
  catch (e) {
    res.send(e)
  }
}
)





//Reading Individual data
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const idfind = await User.findById(id);
    if (!idfind) {
      return res.status(401).send();
    }
    else {

      res.send(idfind);
    }
  }
  catch (e) {
    res.status(400).send(e)
  }
}
)

router.post('/add',
  [
    check('first_name', 'First Name is required')
      .not()
      .isEmpty(),
    check('last_name', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .withMessage('must contain a number'),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exist' }]
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        phonenumber: req.body.phonenumber
      });

      let wait = await user.save();
      res.status(201).send(wait);
      res.json({ user: 'registered' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  }
);






//Delete Record

router.delete('/:id', async (req, res) => {

  try {
    const removeUser = await User.deleteOne({ _id: req.params.Id });
    res.sendStatus(200);
  } catch (err) {
    res.json({ msg: err });
  }

}
)


//Update User By its id
router.patch('/:id', async (req, res) => {
  try {
    const updateuser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updateuser) {
      return res.status(401).send();
    } else {
      res.send(updateuser);
    }

  } catch (error) {
    res.send(error);
  }
}
)


//login



router.post("/login", async (req, res) => {

  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) return res.status(400).send("Invalid email");

    if (validUser) {
    const validPass = await bcrypt.compare(req.body.password, validUser.password);
    if (!validPass) return res.status(400).send("Invalid Password");
    const token = await validUser.generateAuthToken();
    if(!token) return res.status(400).send("You cannot login in more than 3 devices")
    res.status(200).send("Login Successfully")
    
    }
    else {       
       res.status(400).send("Invalid Crendentialls")
      }

  } catch (error) {
    res.status(401).send(error)
  }


});



module.exports = router;