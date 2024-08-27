/////////////////////////////////////////////////////////
/* ------------------ DEPENDANCIES ------------------ */

const Product = require('../models/product.js') // Call to the customer mod

/* ------------------ DEPENDANCIES ------------------ */
/////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

// Function triggered when hitting products route
function index(req, res){
    //res.json('GET /products!')
    res.json(Product.getAll())
}

// Function triggered when hitting products route
function getOne(req, res){
    //res.json(`Index: ${req.params.idx}`)
    res.json(Product.getOne(req.params.idx))
}

// Function triggered when hitting products route
function createProducts(req, res){
    Product.createProduct(req.body.productData)
    res.json(Product.getAll())
}




/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////

module.exports = { index, getOne, createProducts }