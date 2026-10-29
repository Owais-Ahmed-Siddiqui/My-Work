// Arrays 

let fruitarray = ["apple", "banana", "cherry", "date", "elderberry"];

fruitarray.push("fig"); // adds an element to the end of the array
fruitarray.unshift("grape"); // adds an element to the beginning of the array

console.log(fruitarray);
console.log(typeof fruitarray);
console.log(fruitarray.length);

for (let i = 0; i < fruitarray.length; i++) {
    console.log(fruitarray[i]);
}


let newarray = ["Owais", "Ali", "Ahmed", "Hassan", "Hussain"];

//newarray.pop(); // removes the last element from the array
//newarray.shift(); // removes the first element from the array

let removedElement = newarray.pop()  //tells which element is removed from the array
let removedElement2 = newarray.shift() //tells which element is removed from the array

console.log("Removed Element:", removedElement);
console.log("Removed Element 2:", removedElement2);
console.log("Remaining Array:", newarray);