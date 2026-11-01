let number = 0;

// Grab the DOM element where we want to show the number
const counterDisplay = document.getElementById("counter");

const intervalId = setInterval(() => {
  number++;
  
  // Update the text content of the HTML element every second
  counterDisplay.textContent = number;
  console.log("Current number:", number);

  if (number === 10) {
    console.log("Reached 10. Stopping the interval.");
    clearInterval(intervalId);
  }
}, 1000);

