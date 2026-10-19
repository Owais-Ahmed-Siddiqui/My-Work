const myOriginalMenu = document.querySelector("#menu-1")
console.log(myOriginalMenu)

const myClonedMenu = myOriginalMenu.cloneNode(true)
console.log(myClonedMenu)
myClonedMenu.id = "menu-2"

document.body.appendChild(myClonedMenu)

//=======================

const liNode = document.createElement("li")
liNode.textContent = "Training Modes"
myOriginalMenu.appendChild(liNode)