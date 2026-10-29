document.getElementById("myForm").addEventListener("submit", function(e){
    e.preventDefault() // stops refreshing the page
    
    const user = document.getElementById("myInput").value
    
    if (user === ""){
        document.getElementById("p1").textContent = "You must Enter UserName"
    }else{
        document.getElementById("p1").textContent = "Form Submitted Succesfully"
    }
})

const input = document.getElementById("ip1")
const myPara = document.getElementById("p1")

input.addEventListener("blur", function() {
    myPara.textContent = "Input Box Lost Focus"
})