function updateClock() {
    let time = new Date();

    let hours = time.getHours();
    let minute = time.getMinutes();
    let secs = time.getSeconds();
    let millisecs = Math.floor(time.getMilliseconds() / 10); // Get 2-digit milliseconds

    // Determine AM or PM
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zeros when values are less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minute = minute < 10 ? "0" + minute : minute;
    secs = secs < 10 ? "0" + secs : secs;
    millisecs = millisecs < 10 ? "0" + millisecs : millisecs;

    // Update the DOM elements
    document.getElementById("hr").textContent = hours;
    document.getElementById("min").textContent = minute;
    document.getElementById("sec").textContent = secs;
    document.getElementById("millisec").textContent = millisecs;
    document.getElementById("ampm").textContent = ampm;
    
}

// Run updateClock every 10 milliseconds for a smooth ticking clock
setInterval(updateClock, 10);