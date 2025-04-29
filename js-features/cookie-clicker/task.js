let cookieImg = document.querySelector("#cookie");

let counterElement = document.querySelector("#clicker__counter");
let counter = 0;

let speed = document.querySelector("#clicker__speed");
let lastClickTime = new Date();

cookieImg.addEventListener("mousedown", function(event) {
    this.width *= 1.05;
    let currentClickTime = new Date();
    // speed.textContent = (1000 / (currentClickTime - lastClickTime)).toPrecision(2); // cuts digits if speed > 10
    speed.textContent = Math.round(1000 / (currentClickTime - lastClickTime) * 100) / 100;
    lastClickTime = currentClickTime;
    counterElement.textContent = ++counter;
});

cookieImg.addEventListener("mouseup", function(event) {
    this.width /= 1.05;
});