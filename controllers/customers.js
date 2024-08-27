/////////////////////////////////////////////////////////
/* ------------------ DEPENDANCIES ------------------ */

const Customer = require('../models/customer.js') // Call to the customer mod

/* ------------------ DEPENDANCIES ------------------ */
/////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

// Function triggered when hitting customers route
function index(req, res){
    //res.json('GET /Customers!')
    res.json(Customer.getAll())
}

// Function triggered when hitting customers route
function getOne(req, res){
    //res.json(`Index: ${req.params.idx}`)
    const customer = Customer.getOne(req.params.searchString)
    console.log('customer in controller:', customer)
    res.json(customer)
}

// Function triggered when hitting customers route
function createCustomers(req, res){
    //res.json('POST /Customers!')
    Customer.createCustomer(req.body.customerData)
    res.json(Customer.getAll())
}

/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////

module.exports = { index, getOne, createCustomers }