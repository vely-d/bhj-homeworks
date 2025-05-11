const progressBar = document.querySelector("#progress");

let xhr = new XMLHttpRequest();

xhr.upload.addEventListener("progress", function(event) {
    progressBar.value = event.loaded / 1000281;
});

document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    let data = new FormData(this);
    data.append("digits", "1".repeat(1e6));
    xhr.send(data);
});