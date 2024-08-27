/////////////////////////////////////////////////////////
/* -------------------- CONSTANTS -------------------- */

const PORT = 3000

/* ------------------ END CONSTANTS ------------------ */
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
/* ------------------- DEPENDANCIES ------------------ */

const express = require('express') // Required for Database
const cors = require('cors') // Required to access from outside project
const logger = require('morgan') // used for logging
const customerRoutes = require('./routes/customers.js') // Required for Customer Routes
const productRoutes = require('./routes/products.js') // Required for Product Routes

/* ----------------- END DEPENDANCIES ---------------- */
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
/* ------------------- APP STARTUP ------------------- */

const app = express() // Create express app
app.use(cors()) // Use cors
app.use(logger('dev')) // Use logger

/* ----------------- END APP STARTUP ----------------- */
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
/* ------------------ APP MIDDLEWARE ----------------- */

app.use(express.json()) // Store any JSON passed into the BODY of the request

/* ---------------- END APP MIDDLEWARE --------------- */
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
/* ---------------------- ROUTES --------------------- */

app.get('/', main) // Setup Main Route
app.use('/customers', customerRoutes) // Setup Customer Routes
app.use('/products', productRoutes) // Setup Product Routers

/* -------------------- END ROUTES ------------------- */
/////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
/* ---------------------- START ---------------------- */

app.listen(PORT, startup)

/* -------------------- END START -------------------- */
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

// Function triggered when hitting main website
function main(req, res){
    res.send('Server Is Running!')
}

// App Start Message
function startup(){
    console.log(`Server is running on PORT: ${PORT}`)
}

/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////