// Product Data

const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 85000, stock: 5 },
    { id: 2, name: "Mouse", category: "Accessories", price: 1500, stock: 0 },
    { id: 3, name: "Keyboard", category: "Accessories", price: 3500, stock: 10 },
    { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3 },
    { id: 5, name: "USB Cable", category: "Accessories", price: 700, stock: 15 }
];


// ===============================
// Part 1: Display Available Products
// ===============================

function displayAvailableProducts() {

    console.log("===== AVAILABLE PRODUCTS =====");

    for (let i = 0; i < products.length; i++) {

        if (products[i].stock > 0) {

            console.log("Name: " + products[i].name);
            console.log("Category: " + products[i].category);
            console.log("Price: Rs. " + products[i].price);
            console.log("Stock: " + products[i].stock);
            console.log("-----------------------------");
        }
    }
}


// ===============================
// Part 2: Calculate Order
// ===============================

function calculateOrder() {

    // Customer Cart

    let cart = [
        { name: "Laptop", price: 85000, quantity: 1 },
        { name: "Keyboard", price: 3500, quantity: 2 }
    ];

    let subtotal = 0;

    // Calculate subtotal

    for (let i = 0; i < cart.length; i++) {

        subtotal = subtotal + (cart[i].price * cart[i].quantity);
    }

    // Calculate discount

    let discount = 0;

    if (subtotal > 50000) {

        discount = subtotal * 0.10;
    }

    // Calculate final total

    let finalTotal = subtotal - discount;


    // Return the order information

    return {
        cart: cart,
        subtotal: subtotal,
        discount: discount,
        finalTotal: finalTotal
    };
}


// ===============================
// Part 3: Display Invoice
// ===============================

function displayInvoice(order) {

    console.log("");
    console.log("========== ORDER INVOICE ==========");

    console.log("");

    console.log("Items:");

    for (let i = 0; i < order.cart.length; i++) {

        let item = order.cart[i];

        let itemTotal = item.price * item.quantity;

        console.log(
            item.name +
            " x " +
            item.quantity +
            " = Rs. " +
            itemTotal
        );
    }

    console.log("");

    console.log("Subtotal: Rs. " + order.subtotal);
    console.log("Discount: Rs. " + order.discount);
    console.log("Final Total: Rs. " + order.finalTotal);

    console.log("");
    console.log("===================================");
}



displayAvailableProducts();

let order = calculateOrder();

displayInvoice(order);