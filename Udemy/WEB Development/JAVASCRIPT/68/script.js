let prom = new Promise((resolve, reject) => {
    resolve(10)
})

prom.then((val) => {
    console.log(val)
})