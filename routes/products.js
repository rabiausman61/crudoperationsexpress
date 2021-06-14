var express = require('express');
var router = express.Router();
var product=require("../models/product");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products= await product.find();
  res.render('products/list', {products});
});

router.get('/add', async function(req, res, next) {
  res.render('products/add');
});

router.post('/add', async function(req, res, next) {
  let p= new product(req.body);
  await p.save();
  res.redirect("/products");
});


router.get('/delete/:id', async function(req, res, next) {
  let p= await product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});




router.get("/edit/:id", async function (req, res, next) {
  let products = await product.findById(req.params.id);
  res.render("products/edit", { products });
});
router.post("/edit/:id", async function (req, res, next) {
  let products = await product.findById(req.params.id);
  products.name = req.body.name;
  products.gender = req.body.gender;
  await products.save();
  res.redirect("/products");
});
module.exports = router;