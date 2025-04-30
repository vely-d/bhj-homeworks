// travels through all .interest elements, applying callback on each of them
function travelAcrossChildren(element, callback) {
    let subBranches = element.querySelectorAll(".interest");
    if(subBranches.length) {
        subBranches.forEach(sb => {
            travelAcrossChildren(sb, callback);
        });
    }
    callback(element);
}

document.querySelectorAll(".interest__check").forEach(c => {
    c.addEventListener("change", function(event) {
        let branch = event.target.parentElement.parentElement;
        travelAcrossChildren(branch, (interest) => {
            interest.querySelector(".interest__check").checked = event.target.checked;
        });
    });
});