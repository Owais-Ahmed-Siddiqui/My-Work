// This function checks if a number is even or odd. It takes a number as input and returns true if the number is even, and false if it is odd. The result is then used to print whether the number is even or odd to the console.

let iseven = function (number) {
  if (number % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

let y = iseven(4);

if (y === true) {
  console.log("The number is even");
} else {
  console.log("The number is odd");
}
