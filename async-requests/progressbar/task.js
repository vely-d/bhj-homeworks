const progressBar = document.querySelector("#progress");

let xhr = new XMLHttpRequest();
xhr.addEventListener("progress", function(event) {
    progressBar.value = event.loaded / event.total;

    // test
    // progressBar.value = event.loaded / 2785799;
});

document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(new FormData(this));
    
    // test
    // xhr.open("GET", "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json");
    // xhr.send();
});