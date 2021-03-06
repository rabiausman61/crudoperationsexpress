var express = require('express');
var router = express.Router();
var product=require("../models/product");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let products= await product.find();
  res.render('products/list', {products});
  } 
  catch (error) {
    res.send("error");
  }
  
});

router.get('/add', async function(req, res, next) {
  try{
  res.render('products/add');
  }
  catch(error){res.send("error");
  }
});

router.post('/add', async function(req, res, next) {
  try {
    let p= new product(req.body);
  await p.save();
  res.redirect("/products");
  } catch (error) {
    res.send("error");
  }
  
});


router.get('/delete/:id', async function(req, res, next) {
  try {
    let p= await product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
  } catch (error) {
    res.send("error");
  }
  
});




router.get("/edit/:id", async function (req, res, next) {
  try {
    let products = await product.findById(req.params.id);
  res.render("products/edit", { products });
  } catch (error) {
    res.send("error");
  }
  
});
router.post("/edit/:id", async function (req, res, next) {
  try {
    let products = await product.findById(req.params.id);
    products.name = req.body.name;
    products.gender = req.body.gender;
    products.email = req.body.email;
    products.coursecode = req.body.coursecode;
    products.streetaddress = req.body.streetaddress;
    products.city = req.body.city;
    products.country = req.body.country;
    products.phoneno = req.body.phoneno;
    await products.save();
    res.redirect("/products");
  } catch (error) {
    res.send("error");
  }
 
});
module.exports = router;
