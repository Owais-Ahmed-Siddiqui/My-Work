document.getElementById("language").addEventListener("change", function () {
  console.log(this.options[this.selectedIndex].text);
  document.getElementById("p1").textContent =
    "You have Selected " + this.options[this.selectedIndex].text;
});
