const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const checkauth=require("../Middleware/verify")

//Read All the Data
router.get('/', async(req,res) => {
  try {
  const getdata = await Products.find();
  res.send(getdata);
  } 
  catch (e) {
    res.send(e)
  }
 }
)



//Reading Individual data
router.get('/:id', checkauth, async(req,res) => {
  try {
 const id=req.params.id;
 const idfind= await Products.findById(id);
 if(!idfind){
   return res.status(401).send();
 }
 else{
 res.send(idfind);
  } 
 }
  catch (e) {
    res.status(400).send(e)
  }
 }
)

//add products

router.post('/add',checkauth,
  
  
  async (req, res) => {
    
    try {
     
      let user = await Products.findOne({ name: req.body.name });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exist' }]
        });
      }
     
      user = new Products({
        name: req.body.name,
        Category: req.body.Category,
        Current_Price: req.body.Current_Price,
        sale_price: req.body.sale_price,
        status:req.body.status
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






//Delete Product

router.delete('/:id',checkauth,async(req,res) => {

  try {
    const removeProduct = await Products.deleteOne({ _id: req.params.Id });
    console.log(removeProduct)
    res.sendStatus(200).json("Product has been removed");
  } catch (err) {
    res.json({ msg: err });
  }
    
  }
)


//Update Products By its id
router.patch('/:id', checkauth, async(req,res) => {
    try {
   const updateproduct = await  Products.findByIdAndUpdate(req.params.id, req.body ,{
     new:true
   });
   if (!updateproduct) {
    return res.status(401).send();
   } else {
    res.send(updateproduct);
   }

    } catch (error) {
      res.send(error);
    }
  }
)






module.exports = router;