const heading = document.querySelector('h1');
const paragraph = document.querySelector('#para2');

const mypara = paragraph.textContent;

console.log(heading.textContent);
console.log(paragraph.textContent);
console.log(mypara);

const inner = mypara.innerText = 'This is the new text for the paragraph.';

console.log(inner);

const mybutton = document.querySelector('#myButton');

mybutton.style.backgroundColor = 'blue';
mybutton.style.color = 'white';
mybutton.style.padding = '10px 20px';
mybutton.style.border = '2px solid black';
mybutton.style.borderRadius = '5px';

// Add event listener to the button ....................

mybutton.addEventListener('click', () => {
    alert('Button clicked!');
});

const myinput = document.querySelector('#myInput');

myinput.addEventListener('input', () => {
    console.log(myinput.value);
});