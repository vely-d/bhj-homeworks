let dead = document.querySelector("#dead");
let deadCount = 0;

let lost = document.querySelector("#lost");
let lostCount = 0;

let gameCycleTimeout = 0;

document.querySelectorAll(".hole").forEach(h => {
    h.addEventListener("click", function() {
        if(this.className.includes("hole_has-mole")) {
            dead.textContent = ++deadCount;
            updateHole();
        } else {
            lost.textContent = ++lostCount;
        }

        if(deadCount >= 10 || lostCount >= 5) {
            alert(deadCount >= 10 ? "победа! кроты побеждены" : "поражение... повезёт в следующий раз");
            dead.textContent = deadCount = 0;
            lost.textContent = lostCount = 0;
        }
    })
});

function updateHole() {
    clearTimeout(gameCycleTimeout);
    document.querySelector(".hole_has-mole").classList.remove("hole_has-mole");
    let randIndex = Math.floor(1 + Math.random() * 9);
    document.querySelector(`#hole${randIndex}`).classList.add("hole_has-mole");
    gameCycleTimeout = setTimeout(() => {
        updateHole();
    }, 800);
}

updateHole();
