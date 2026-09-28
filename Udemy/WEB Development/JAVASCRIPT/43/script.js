// if , else if , else statement

let marks = 85;

if (marks >= 90) {
  console.log("Grade A");
} 
else if (marks >= 80) {
  console.log("Grade B");
} 
else if (marks >= 70) {
  console.log("Grade C");
} 
else if (marks >= 60) {
  console.log("Grade D");
} 
else {
  console.log("Fail");
}

// switch case statement

let a = 10;
let b = 20;
let operator = "+";

switch (operator) {

    case "+":
        console.log(a + b);
        break;

    case "-":
        console.log(a - b);
        break;

    case "*":
        console.log(a * b);
        break;

    case "/":
        console.log(a / b);
        break;

    default:
        console.log("Invalid operator");

}
