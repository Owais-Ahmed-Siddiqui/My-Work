let myarray = [1, 2, 3, 4, 5];
let myarray2 = [6, 7, 8, 9, 10];

let myarray3 = [...myarray, ...myarray2, 11, 12]; // Merging two arrays using the spread operator
console.log(myarray3); // Displaying the merged array

const myobject1 = {
    name: "John",
  age: 30,
  city: "New York",
};

const myobject2 = {
  age: 25, // This will overwrite the age property from myobject1
  country: "USA",
  occupation: "Engineer",
};

const myobject3 = { ...myobject1, ...myobject2 }; // Merging two objects using the spread operator
console.log(myobject3); // Displaying the merged object

const user = {
  name: "Owais",
  email: "owais@gmail.com",
  age: 21,
  city: "Karachi",
}

let name1 = user.name;
let email1 = user.email;
let age1 = user.age;
let city1 = user.city;

console.log(name1, email1, age1, city1); // Displaying the destructured values from the user object

//const {name} = user; // Destructuring the name property from the user object
//const {email} = user; // Destructuring the email property from the user object
//const {age} = user; // Destructuring the age property from the user object
//const {city} = user; // Destructuring the city property from the user object

//console.log(name, email, age, city); // Displaying the destructured values from the user object

//or do this

const {name, email, age, city, university="Hamdard University"} = user; // Destructuring multiple properties from the user object in one line
console.log(name, email, age, city, university); // Displaying the destructured values from the user object