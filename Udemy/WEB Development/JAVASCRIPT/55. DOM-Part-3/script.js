const input1 = document.getElementById('ip1');

console.log(input1);

const val = input1.getAttribute('value');
const type = input1.getAttribute('type');

console.log(val);
console.log(type);

// image 

const myimg = document.getElementById('img1');

console.log(myimg);

// set attribute can be used to set the value of an attribute of an element

myimg.setAttribute('src', 'https://via.placeholder.com/150');

const mylink = document.querySelector('a');
mylink.setAttribute('href', 'https://www.example.com');
const linkText = mylink.textContent;
mylink.setAttribute('title', 'This is a link to example.com');
linkText = mylink.textContent;
console.log(linkText);