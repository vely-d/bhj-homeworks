const editor = document.querySelector("#editor");
editor.textContent = window.localStorage.editorText;

const saveStatus = document.querySelector("#card-status");

function saveChanges() {
    window.localStorage.editorText = editor.value;
}

// const changeEvent = (function() {
//     previousTimeout = null;
//     return function(event) {
//         clearTimeout(previousTimeout);
//         saveStatus.textContent = "сохранение";
//         saveStatus.classList.add("card__status_saving");

//         previousTimeout = setTimeout(() => {
//             saveChanges();
//             saveStatus.textContent = "текст сохранён";
//             saveStatus.classList.remove("card__status_saving");
//         }, 2000);
//     }
// })();

// document.addEventListener("keypress", changeEvent);
document.addEventListener("keypress", saveChanges);
document.querySelector("#clear-btn").addEventListener("click", function() {
    editor.value = "";
    // changeEvent();
    saveChanges();
})