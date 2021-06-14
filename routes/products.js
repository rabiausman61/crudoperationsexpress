var express = require('express');
var router = express.Router();
var product=require("../models/product");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let products= await product.find();
  res.render('products/list', {products});
  } catch (error) {
    res.render(e);
  }
  
});

router.get('/add', async function(req, res, next) {
  try{
  res.render('products/add');
  }
  catch(error){res.render(e);
  }
});

router.post('/add', async function(req, res, next) {
  try {
    let p= new product(req.body);
  await p.save();
  res.redirect("/products");
  } catch (error) {
    res.render(e);
  }
  
});


router.get('/delete/:id', async function(req, res, next) {
  try {
    let p= await product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
  } catch (error) {
    res.render(e);
  }
  
});




router.get("/edit/:id", async function (req, res, next) {
  try {
    let products = await product.findById(req.params.id);
  res.render("products/edit", { products });
  } catch (error) {
    res.render(e);
  }
  
});
router.post("/edit/:id", async function (req, res, next) {
  try {
    let products = await product.findById(req.params.id);
    products.name = req.body.name;
    products.gender = req.body.gender;
    await products.save();
    res.redirect("/products");
  } catch (error) {
    res.render(e);
  }
 
});
module.exports = router;