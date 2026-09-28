// functions in javascript

function greet(){
    console.log(" Hi Iam Owais");
}

greet();
greet();
greet();
greet(); // prints the message 4 times

// functions with parameters

function addnum(a,b){
    let sum = a + b;
    console.log("The sum of the two numbers is:", sum); //or use return sum; and then call the function with console.log(addnum(5,10));
}

addnum(5, 10);
addnum(20, 30);
addnum(100, 200); // prints the sum of the two numbers 3 times

//with three numbers

function addnum2(a,b,c=0){ // default value of c is 0
    let sum2 = a + b + c;
    return "the sum of the three numbers is: " + sum2; // returns the sum of the three numbers

}

console.log(addnum2(5, 10, 15));
console.log(addnum2(20, 30, 40));
console.log(addnum2(100, 200, 300)); // prints the sum of the three numbers 3 times


