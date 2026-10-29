// function to add three numbers with default value for the third parameter

function addnum2(a, b, c = 0) {
  // default value of c is 0
  let sum2 = a + b + c;
  return sum2; // returns the sum of the three numbers
}

let result1 = addnum2(5, 10, 15);
let result2 = addnum2(20, 30, 40);
let result3 = addnum2(100, 200, 300);

console.log("The result for the first set of numbers is:", result1);
console.log("The result for the second set of numbers is:", result2);
console.log("The result for the third set of numbers is:", result3); // prints the sum of the three numbers 3 times

//parameter ...

function numbers(...num) {

  let sum = 0;

  for (let numb of num) {
    sum = sum + numb;
  }

  return sum;
}

let result4 = numbers(5, 10, 15, 20);
let result5 = numbers(20, 30, 40, 50, 60);
let result6 = numbers(100, 200, 300, 400, 500);

console.log("The sum of the first set of numbers is:", result4);
console.log("The sum of the second set of numbers is:", result5);
console.log("The sum of the third set of numbers is:", result6); // prints the sum of the numbers 3 times

// global and local variables
// global variable is declared outside the function and can be accessed anywhere in the code, while local variable is declared inside the function and can only be accessed within that function.
// local variable is declared inside the function and can only be accessed within that function.

let a = 10; // global variable

function myFunction() {
  let b = 20; // local variable
  console.log(a); // accesses the global variable
  console.log(b); // accesses the local variable
}
myFunction();