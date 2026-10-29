const p = document.createElement("p")
p.textContent = "my New Para - Java Script - Dynamically"

const myDiv = document.getElementById("d-1")
myDiv.appendChild(p)


const p1 = document.createElement("p")
p1.textContent = "my New Para - Java Script -First Para "
myDiv.prepend(p1)

//this shows how to remove a child node from the DOM using the removeChild() method and adding a new child node using the appendChild() method.