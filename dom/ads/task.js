// solution for easy task

// function attachRotation(rotator) {
//     let currentCase = rotator.querySelector(".rotator__case_active");
//     let caseInd = Array.prototype.indexOf.call(rotator.children, currentCase);
//     rotator.rotate = function () {
//         this.children[caseInd].classList.remove("rotator__case_active");
//         caseInd = (caseInd + 1) % this.children.length;
//         this.children[caseInd].classList.add("rotator__case_active");
//     };
// }

// let rotators = document.querySelectorAll(".rotator");

// for(let r of rotators) {
//     attachRotation(r);
// }

// let textSwappingInterval = setInterval(() => {
//     for(let r of rotators) {
//         r.rotate();
//     }
// }, 1000);

// solution for harder task

function attachRotation(rotator) {
    let currentCase = rotator.querySelector(".rotator__case_active");
    let caseInd = Array.prototype.indexOf.call(rotator.children, currentCase);
    rotator.rotate = function() {
        let prevCase = this.children[caseInd];
        prevCase.classList.remove("rotator__case_active");
        prevCase.removeAttribute("style");

        caseInd = (caseInd + 1) % this.children.length;
        let newCase = this.children[caseInd]; 
        newCase.classList.add("rotator__case_active");
        newCase.style.setProperty("color", newCase.dataset.color);
        this.rotationTimeout = setTimeout(() => { this.rotate(); }, +newCase.dataset.speed);
    };
    rotator.stop = function() { clearTimeout(this.rotationTimeout); };
}

let rotators = document.querySelectorAll(".rotator");

for(let r of rotators) {
    attachRotation(r);
    r.rotate();
}