let student = {
    name: "John",
    age: 20,
    'Roll No': 12345, // Property name with a space 
}

student.age = 21; // Modifying the age property
student.city = "New York"; // Adding a new property
delete student['Roll No']; // Deleting the 'Roll No' property

console.log(student); // Displaying the entire student object
console.log(student.name); // Accessing property using dot notation
console.log(student['Roll No']); // Accessing property using bracket notation because it has a space in the key name
console.log(student.city); // Accessing the newly added property

for (let key in student) {
    console.log(key + ": " + student[key]); // Iterating over the properties of the student object
}

console.log(Object.keys(student)); // Getting all the keys of the student object
console.log(Object.values(student)); // Getting all the values of the student object
console.log(Object.entries(student)); // Getting all the key-value pairs of the student object