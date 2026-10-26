document.getElementById("email").addEventListener("blur", function(){
    if (this.value === ""){
        document.getElementById("p1").textContent = "Email is Required"
    }
})

const input = document.getElementById("ip1")

input.addEventListener("focus", function(){
    input.style.background = "yellow"
})

input.addEventListener("blur", function(){
    input.style.background = "white"
})