/////////////////////////////////////////////////////////
/* ------------------ DEPENDANCIES ------------------ */

const products = require('../product-data.js') // Call to the customer mod

/* ------------------ DEPENDANCIES ------------------ */
/////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

// Return All
function getAll(){
    return products
}

// Return One Customer based on the idx provided
function getOne(idx){
    idx = parseInt(idx)
    const product = products.find(product => product.id === idx)
    return product || { message: 'Product not found!' }
}

function createProduct(product){
    
    console.log("adding product to DB", product)

    const newProduct = {
        id: products.length,
        title: product.title,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
        available: parseInt(product.available)            
    }
    products.push(newProduct)
}

/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////

module.exports = { getAll, getOne, createProduct }