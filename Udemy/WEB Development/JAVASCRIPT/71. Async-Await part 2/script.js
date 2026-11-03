function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function orderPizza() {
    // 1 Order placed
    console.log("Order is Placed");

    // 2 Immediately show In Process
    console.log("Order is in Process");

    // wait for 5000 milliseconds
    await delay(5000);

    // 3 After 5 seconds
    console.log("Pizza is Ready");
    console.log("Enjoy your Food");
}

orderPizza();


function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User: Owais");
        }, 1500);
    });
}

async function displayUser() {
    console.log("Fetching user...");
    let user = await getUser();
    console.log(user);
}

displayUser();