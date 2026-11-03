let myPromise = new Promise(function(resolve, reject) {
    resolve("Task Completed Succesfully")
})

myPromise.then(function(result) {
    console.log(result)
})

let myPromise2 = new Promise(function(resolve, reject) {
    reject("Something went wrong")
})

myPromise2.catch(function(error) {
    console.log(error)
})

let marks = 50;

let examResult = new Promise(function(resolve, reject){
    if (marks >= 40) {
        resolve("Pass");
    } else {
        reject("Fail");
    }
});

examResult
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log(error);
    });