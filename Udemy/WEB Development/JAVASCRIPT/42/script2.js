let x = "20"
let y = 10

console.log(x < y)
console.log(x > y)
console.log(x <= y)
console.log(x >= y)

console.log(x == y) // true if the values are equal
console.log(x != y) // true if the values are not equal

console.log(x === y) // true if the values and types are strict equal (num=num str=str)
console.log(x !== y) // true if the values or types are strict not equal

// AND OR NOT  
// AND (&&) - true if both conditions are true
console.log(x > 10 && y < 20) // true && true = true
console.log(x > 10 && y > 20) // true && false = false
console.log(x < 10 && y < 20) // false && true = false
console.log(x < 10 && y > 20) // false && false = false

// OR (||) - true if at least one condition is true
console.log(x > 10 || y < 20) // true || true = true
console.log(x > 10 || y > 20) // true || false = true
console.log(x < 10 || y < 20) // false || true = true
console.log(x < 10 || y > 20) // false || false = false

// NOT (!) - true if the condition is false
console.log(!(x > 10)) // !(true) = false
console.log(!(x < 10)) // !(false) = true

//-- decrement and increment operators
let z = 5
z++ // ans = 6
z-- // ans = 4

//Dialog boxes
// alert("Hello World") // shows a message box with an OK button
// confirm("Are you sure?") // shows a message box with OK/Cancel buttons
// let name = prompt("Enter your name: ") // shows a message box with an input field and OK/Cancel buttons
// console.log(name) // prints the entered name to the console

alert("Hello World") // prints a message to the console
let x = prompt("Enter your name: ") // shows a message box with an input field and OK/Cancel buttons
let y = confirm("Are you sure?") // shows a message box with OK/Cancel buttons