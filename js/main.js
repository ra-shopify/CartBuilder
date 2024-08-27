console.log('JavaScript is running!')

/////////////////////////////////////////////////////////
/* -------------------- ELEMENTS --------------------- */

const customerFormEl = document.querySelector('form.customerForm') // Get the Current Input from the form

const unorderedProductListEl = document.getElementById('unordered-product-list') // Get the unordered list element

const unorderedCartListEl = document.getElementById('unordered-cart-list') // Get the unordered list element

const customerSearchButtonEl = document.querySelector('#customer-search') // Get the search button

const productFormListEl = document.querySelector('form.productForm') // Get the Current Input from the form

const currentCustomerEl = document.getElementsByClassName('current-customer') // Get the Current Customer Element

/* ------------------ END ELEMENTS ------------------- */
/////////////////////////////////////////////////////////

fetchProducts()

/////////////////////////////////////////////////////////
/* ----------------- STATE VARIABLES ----------------- */

let currentCustomer
let availableProducts = []
let productsAddedtoCart = []

/* --------------- END STATE VARIABLE ---------------- */
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
/* -------------------- FUNCTIONS -------------------- */

/* --------------- PRODUCT FUNCTIONS ----------------- */

// Pull Products from Web Server and display them on the screen
async function fetchProducts(){
    const products = await fetch('http://localhost:3000/products')
    const data = await products.json()
    console.log(data)
    availableProducts = data
    render()
}

// Verify That the added quantity is less than the available 
function checkQuantity(product, quantity) {
    console.log(`Quantity: ${quantity} Available: ${product.available}`)
    if(quantity > product.available) {
        console.log('Alert Triggered: Not Enough In Stock')
        alert('Not enough in stock');
        return false;
    }
    else
        return true
}

// Verify That the added existing quantity + new quantity is less than the available 
function checkTotalQuantity(product, cartProduct, quantity) {
    const totalQty = parseInt(cartProduct.quantity) + parseInt(quantity)
    console.log(`Total Quantity: ${totalQty} Available: ${product.available}`)
    if(totalQty > product.available) {
        console.log('Alert Triggered: Not Enough In Stock')
        alert('Not enough in stock');
        return false;
    }
    else
        return true
}

// Function loops through each product added to cart and if the IDs match then check total quanntity availability
// If the total quantity is less than the available quantity, then add the quantity to the cart
// If not trigger an alert message
// Function returns false if the product is not in the cart
function checkAddProductInCart(product, quantity){

    let productFound = false;

    productsAddedtoCart.forEach(cartProduct => {
        if(cartProduct.id === product.id){
            productFound = true
            console.log('Product already in cart')
            if(!checkTotalQuantity(product, cartProduct, quantity))
                return

            cartProduct.quantity = parseInt(cartProduct.quantity) + parseInt(quantity)
            console.log(productsAddedtoCart)
            console.log('Product Quantity Updated')
            return true
        }
    })
    return productFound
}



/* --------------- END PRODUCT FUNCTIONS -------------- */

/* ---------------- EVENT FUNCTIONS ---------------- */

// Function triggered when hitting the "Add to Cart" button
function handleAddToCart(product, quantity) {
    console.log('Product added to cart:', product);
    console.log('Quantity:', quantity);
    
    // 1 Check quantity
    if(!checkQuantity(product, quantity))
        return;

    // 2 Check if product is already in the cart
    // If it is, check if total quantity is less than available
    // If yes up quantity to new + existing
    if(checkAddProductInCart(product, quantity)){
        console.log('Product already in cart')
    }
    else{
        // 3 If product is not in the cart, add it to the cart
        console.log('Product not in cart')
        productsAddedtoCart.push({id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price, 
            quantity: quantity});
    }
    render();
}

productFormListEl.addEventListener('submit', addProductToDatabase)

// Logic to add function to database
async function addProductToDatabase(event){

    event.preventDefault()
    console.log('Adding Product to Database')

    let titleInput = document.getElementById('title');
    let descriptionInput = document.getElementById('description');
    let priceInput = document.getElementById('price');
    let availableInput = document.getElementById('available');
    let imageURLInput = document.getElementById('imageURL');

    const productData = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        available: availableInput.value,
        imageURL: imageURLInput.value
    };

    console.log('logging product data', productData)

    const productCreate = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productData})
    })

    availableProducts = await productCreate.json()
    console.log(availableProducts)
    productFormListEl.reset()
    render()
}

customerSearchButtonEl.addEventListener('click', searchCustomer)

async function searchCustomer(event){
    event.preventDefault()
    console.log('Searching for Customer')

    let customerInput = document.getElementById('customer-search-input');

    const customer = await fetch(`http://localhost:3000/customers/${customerInput.value}`)
    const data = await customer.json()
    console.log('Received back:', data)
    
    if(data?.firstName){
        currentCustomer = data
        alert(`${data.firstName} ${data.lastName} Added To The Cart!`)
    }
    else{
        console.log('Customer Not Found')
        alert(data.message);
    }

    render()
}

customerFormEl.addEventListener('submit', addCustomerToDatabase)

// Logic to add function to database
async function addCustomerToDatabase(event){

    event.preventDefault()
    console.log('Adding Customer to Database')

    let fName = document.getElementById('fName').value;
    let lName = document.getElementById('lName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let birthday = document.getElementById('birthday').value;
    let street = document.getElementById('street').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let zip = document.getElementById('zip').value;


    const customerData = {
        firstName: fName,
        lastName: lName,
        emailAddress: email,
        phoneNumber: phone,
        birthday: birthday,
        address: [{
            street: street,
            city: city,
            state: state,
            zip: zip
        }]
    };

    console.log('logging customer data', customerData)

    const productCreate = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({customerData})
    })

    customerFormEl.reset()
    render()
}


/* -------------- END EVENT FUNCTIONS -------------- */


/* ----------------- RENDER FUNCTIONS ----------------- */

// Renders The UI
function render(){
    renderCustomer()
    renderProducts()
    renderCartProducts()
}


function renderCustomer(){
    console.log('current customer', currentCustomer)
    if(currentCustomer){
        console.log('current customer element', currentCustomerEl[0])
        currentCustomerEl[0].innerHTML = 
        `<div class="customer-box">
            <h3 class="customer-name">${currentCustomer.firstName} ${currentCustomer.lastName}</h3>
            <p>${currentCustomer.emailAddress}</p>
            <p>${currentCustomer.phoneNumber}</p>
            <p class="address-label">Address:</p>
            <p class="address-detail">${currentCustomer.address[0].street}</p>
            <p class="address-detail">${currentCustomer.address[0].city}</p>
            <p class="address-detail">${currentCustomer.address[0].state}</p>
            <p class="address-detail">${currentCustomer.address[0].zip}</p>
        </div>`
    }
}

// Renders The Products (*Note added event listener to the "Add to Cart" button)
function renderProducts() {

    console.log(availableProducts);
    unorderedProductListEl.innerText = ''
    // For Each product in the list pulled back from the server
    availableProducts.forEach(product => {

    // Create the List Element
    const newListEl = document.createElement('li');
    newListEl.classList.add('product-item');
    
    // Image Element added to cart UI
    const imageEl = document.createElement('img');
    imageEl.src = product.imageURL; // Assuming product.imageUrl contains the image link
    console.log(product.imageURL);
    imageEl.alt = product.title;
    imageEl.classList.add('product-image');

    // Span Elements create inline container element good for organizing text in the html / css
    /* ------------ Span Elements ------------ */
    const titleEl = document.createElement('span');
    titleEl.innerText = product.title;
    
    const descriptionEl = document.createElement('span');
    descriptionEl.innerText = product.description;
    
    const priceEl = document.createElement('span');
    priceEl.innerText = product.price;
    
    const availableEl = document.createElement('span');
    availableEl.innerText = product.available;
    /* ---------- End Span Elements ---------- */
    
    // For Each Product, create an input element representing the quantity
    const quantityInputEl = document.createElement('input');
    quantityInputEl.type = 'number';
    quantityInputEl.min = '1';
    quantityInputEl.placeholder = 'Qty';
    quantityInputEl.classList.add('quantity-input');

    // For each element create a button to add the element to the cart
    const addToCartButtonEl = document.createElement('button');
    addToCartButtonEl.innerText = 'Add to Cart';
    addToCartButtonEl.classList.add('add-to-cart-button');
    
    // Add event listener to the "Add to Cart" button
    addToCartButtonEl.addEventListener('click', () => {
        const quantity = quantityInputEl.value;
        handleAddToCart(product, quantity);
    });

    // Append the elements to the list element
    newListEl.appendChild(imageEl);
    newListEl.appendChild(titleEl);
    newListEl.appendChild(descriptionEl);
    newListEl.appendChild(priceEl);
    newListEl.appendChild(availableEl);
    newListEl.appendChild(quantityInputEl);
    newListEl.appendChild(addToCartButtonEl);
    
    // Append the list element to the unordered list element
    unorderedProductListEl.appendChild(newListEl);
    });
}

// Renders The Products
function renderCartProducts() {

    console.log(productsAddedtoCart);
    unorderedCartListEl.innerText = ''
    // For Each product in the list pulled back from the server
    productsAddedtoCart.forEach(product => {
        // Create the List Element
        const newListEl = document.createElement('li');
        newListEl.classList.add('product-list-item');
        
        // Span Elements create inline container element good for organizing text in the html / css
        /* ------------ Span Elements ------------ */
        const titleEl = document.createElement('span');
        titleEl.innerText = product.title;
        
        const descriptionEl = document.createElement('span');
        descriptionEl.innerText = product.description;
        
        const priceEl = document.createElement('span');
        priceEl.innerText = product.price;
        
        const quantityEl = document.createElement('span');
        quantityEl.innerText = product.quantity;

        const totalEl = document.createElement('span');
        totalEl.innerText = (parseFloat(product.price) * parseInt(product.quantity)).toFixed(2);

        /* ---------- End Span Elements ---------- */
        
        // Append the elements to the list element
        newListEl.appendChild(titleEl);
        newListEl.appendChild(descriptionEl);
        newListEl.appendChild(priceEl);
        newListEl.appendChild(quantityEl);
        newListEl.appendChild(totalEl);
        
        // Append the list element to the unordered list element
        unorderedCartListEl.appendChild(newListEl);
    });
}

/* --------------- END RENDER FUNCTIONS --------------- */

/* ---------------- CUSTOMER FUNCTIONS ---------------- */





/* -------------- END CUSTOMER FUNCTIONS -------------- */






/* ------------------ END FUNCTIONS ------------------ */
/////////////////////////////////////////////////////////