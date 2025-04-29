let timer = document.querySelector("#timer");
let left = 59; // we either way would make some kind of request to get it, so why bothering..
let followUpLink = document.querySelector("#follow-up-link1");

let timerInterval = setInterval(() => {
    left--;
    let hh = Math.floor(left/3600);
    hh = "0".repeat(hh < 10) + hh;
    let mm = Math.floor(left/60)%60;
    mm = "0".repeat(mm < 10) + mm;
    let sec = left%60;
    sec = "0".repeat(sec < 10) + sec;
    timer.textContent = `${hh}:${mm}:${sec}`;
    if(left <= 0) {
        clearInterval(timerInterval);
        // followUpLink.click(); // does not work due to popup blocking
        location = followUpLink.href;
    }
}, 1000);