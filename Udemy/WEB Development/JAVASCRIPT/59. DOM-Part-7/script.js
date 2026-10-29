const mybtn = document.getElementById("btn");
const mybtn2 = document.getElementById("btn2");
const mybtn3 = document.getElementById("btn3");

mybtn.addEventListener("click", function () {
  alert("You clicked the first button");
});

mybtn2.addEventListener("click", function () {
  alert("You clicked the second button");
});

mybtn3.addEventListener("click", function () {
  alert("You clicked the third button");
});

const mybtn4 = document.querySelectorAll("#buttons button");

for (let btn of mybtn4) {
  btn.addEventListener("click", function () {
    console.dir(this.textContent);
  });
}
