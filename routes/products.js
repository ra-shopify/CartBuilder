/////////////////////////////////////////////////////////
/* ------------------- DEPENDANCIES ------------------ */

const express = require('express')
const router = express.Router()
const productsCtrl = require('../controllers/products.js')

/* ----------------- END DEPENDANCIES ---------------- */
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
/* ---------------------- ROUTES --------------------- */

// products/ -> Get all products
router.get('/',productsCtrl.index)

// [GET] products/ -> Create a new product
router.get('/:idx',productsCtrl.getOne)

// [POST] products/ -> Create a new product
router.post('/', productsCtrl.createProducts)

/* -------------------- END ROUTES ------------------- */
/////////////////////////////////////////////////////////

module.exports = router