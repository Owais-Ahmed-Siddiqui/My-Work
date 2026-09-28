// Arrays splice method, deletes and adds elements to an array

let fruitarray = ["apple", "banana", "cherry", "date", "elderberry"];

let removed = fruitarray.splice(0, 1); // removes the first element from the array and returns it
let removed2 = fruitarray.splice(1, 1); // removes the second element from the array and returns it
let removed3 = fruitarray.splice(2, 1); // removes the third element from the array and returns it 
let add = fruitarray.splice(1, 0, "fig"); // adds "fig" at index 1 without removing any elements 


console.log("Removed Element:", removed);
console.log("Removed Element 2:", removed2);
console.log("Removed Element 3:", removed3);
console.log("Added Element:", add);
console.log("Remaining Array:", fruitarray);

// sort and reverse methods

let array = ["bugatti", "ferrari", "lamborghini", "porsche", "mclaren"];
let sortedArray = array.sort(); // sorts the array in alphabetical order
let reversedArray = array.reverse(); // reverses the order of the array

console.log("Sorted Array:", sortedArray);
console.log("Reversed Array:", reversedArray);