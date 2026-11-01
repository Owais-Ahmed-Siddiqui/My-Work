function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
    return x / y;
}

function reminder(x, y) {
    return x % y;
}

function calc(a, b, oper) {
    return oper(a, b);
}

const res1 = calc(20, 3, reminder);
console.log(res1);

// Callback function example

function greet(name, callback){
    console.log("Hello Good Morning " + name)
    callback()
}

function bye(){
    console.log("bye Bye")
}

greet("Rohit", bye)