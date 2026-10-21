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

const liNode2 = document.createElement("li")
liNode2.textContent = "Training Modes"
myClonedMenu.appendChild(liNode2)

const liNode3 = document.createElement("li")
liNode3.textContent = "Training Modes"
myOriginalMenu.appendChild(liNode3)

//=========================

let liNode4 = document.createElement("li")
liNode4.textContent = "Training Modes"
myClonedMenu.appendChild(liNode4)

if (myOriginalMenu.contains(liNode3)) {
    console.log("The original menu contains the liNode3")
}

if (myClonedMenu.contains(liNode4)) {
    console.log("The cloned menu contains the liNode4")
}