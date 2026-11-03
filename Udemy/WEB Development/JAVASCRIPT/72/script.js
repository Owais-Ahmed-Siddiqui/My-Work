console.log("Start");

setTimeout(function(){
    console.log("call back Executed after 10 seconds");
}, 10000);

console.log("end");


function loadData(callback) {
    // Asynchronous task (simulating server call)
    setTimeout(() => {
        console.log("Data loaded");
        callback(); // calling the callback function
    }, 2000);
}

function showMessage() {
    console.log("Processing completed");
}

loadData(showMessage);