// we will learn DOM
// DOM is Document Object Model that is used to represent the structure of a web page. It allows us to manipulate HTML and CSS using JavaScript.

const myroot = document.getrootNode();

console.log(myroot); // this will give us the root node of the document

//next we will learn about the different types of nodes in the DOM

const mybody = document.body;
console.log(mybody); // this will give us the body of the document

const myhead = document.head;
console.log(myhead); // this will give us the head of the document

const mytitle = document.title;
console.log(mytitle); // this will give us the title of the document

const myhtml = document.documentElement;
console.log(myhtml); // this will give us the html element of the document

// child nodes are the nodes that are directly under a parent node. We can access child nodes using the childNodes property.

const mychildnodes = document.childNodes;
console.log(mychildnodes); // this will give us all the child nodes of the document

//childnodes1 ,0  are the first child node of the document which is the doctype node and the second child node is the html element.

const myfirstchild = document.firstChild;
console.log(myroot.childnodes[1]); // this will give us the first child node of the document

//sibling nodes are the nodes that are at the same level in the DOM tree. We can access sibling nodes using the nextSibling and previousSibling properties.

const mynextsibling = document.nextSibling;
console.log(mynextsibling); // this will give us the next sibling node of the document