let time = new Date()

let hours = time.getHours()
let minute = time.getMinutes()
let secs = time.getSeconds()

console.log(hours + ":" + minute + ":" + secs)

// Add leading 0 when hr/min/sec less than 10

hours = hours < 10 ? "0" + hours : hours
minute = minute < 10 ? "0" + minute : minute
secs = secs < 10 ? "0" + secs : secs

console.log(hours + ":" + minute + ":" + secs)

document.getElementById("hr").textContent = hours
document.getElementById("min").textContent = minute
document.getElementById("sec").textContent = secs