/////////////////////////////////////////////////////////
/* ------------------ DEPENDANCIES ------------------ */

const customers = require('../customer-data.js') // Call to the customer mod

/* ------------------ DEPENDANCIES ------------------ */
/////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

// Return All
function getAll(){
    return customers
}

// Return One Customer based on the idx provided
function getOne(searchString){
    console.log('searchString:', searchString)
    console.log('customer:', customers)
    const customer = customers.find(customer => customer.emailAddress.toUpperCase() === searchString.toUpperCase())
    console.log('customer:', customer)    
    return customer || { message: 'Customer not found!' }
}

// Create a New Customer
function createCustomer(customer){
    
    console.log("adding customer to DB", customer)

    const newCustomer = {
        id: customers.length,
        firstName: customer.firstName,
        lastName: customer.lastName,
        emailAddress: customer.emailAddress,
        phoneNumber: customer.phoneNumber,
        birthday: customer.birthday,
        address: [{
            street: customer.address[0].street,
            city: customer.address[0].city,
            state: customer.address[0].state,
            zip: customer.address[0].zip
        }]
    }
    customers.push(newCustomer)
}

/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////

module.exports = { getAll, getOne, createCustomer }