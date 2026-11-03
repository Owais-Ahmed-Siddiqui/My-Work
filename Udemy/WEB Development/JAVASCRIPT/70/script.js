async function add() {
    return 10 + 20
}

add().then((value) => {
    console.log(value)
})

async function getData() {
    let result = await Promise.resolve("Data received");
    console.log(result);
}

getData();


function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task completed after 4 seconds");
        }, 4000);
    });
}

async function doTask() {
    console.log("Task started...");
    let message = await delay();
    console.log(message);
}

doTask();