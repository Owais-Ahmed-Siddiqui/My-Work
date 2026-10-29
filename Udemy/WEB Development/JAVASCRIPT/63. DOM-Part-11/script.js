document.addEventListener("keydown", function (event) {
  console.log(`Key : ${event.key}`);
  console.log(`Code : ${event.code}`);
});


function myFunction(event) {
    document.getElementById("p1").textContent = "You released the " + event.key + " key.";
}