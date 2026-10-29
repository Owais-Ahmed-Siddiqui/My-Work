// Arrow Function

let sum = function(a,b) {
    return a + b;
};

let y = sum(4, 5);
console.log(y);

// lets rewrite the above function using arrow function syntax

let sumArrow = (a, b) => {
    return a + b;
};

let yArrow = sumArrow(4, 5);
console.log(yArrow);

// lets rewrite the above function using arrow function syntax with implicit return

let sumArrowImplicit = (a, b) => a + b;

let yArrowImplicit = sumArrowImplicit(4, 5);
console.log(yArrowImplicit);

