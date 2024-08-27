/////////////////////////////////////////////////////////
/* ------------------- DEPENDANCIES ------------------ */

const express = require('express')
const router = express.Router()
const customersCtrl = require('../controllers/customers.js')

/* ----------------- END DEPENDANCIES ---------------- */
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
/* ---------------------- ROUTES --------------------- */

// products/ -> Get all products
router.route('/').get(customersCtrl.index)

// [GET] products/ -> Create a new product
router.route('/:searchString').get(customersCtrl.getOne)

// [POST] products/ -> Create a new product
router.post('/', customersCtrl.createCustomers)

/* -------------------- END ROUTES ------------------- */
/////////////////////////////////////////////////////////

module.exports = router