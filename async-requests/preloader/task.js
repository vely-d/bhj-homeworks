function displayValutes(valutes) {
    let items = document.querySelector("#items");
    items.innerHTML = "";
    for(let v of Object.values(valutes)) {
        items.innerHTML += `
            <div class="item">
                <div class="item__code">
                    ${v.CharCode}
                </div>
                <div class="item__value">
                    ${v.Value}
                </div>
                <div class="item__currency">
                    руб.
                </div>
            </div>
        `;
    }
}

let localValutes = localStorage.getItem("valutes");
try {
    displayValutes(JSON.parse(localValutes));
} catch (error) {
    
}

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");

xhr.addEventListener("readystatechange", function() {
    switch(this.readyState) {
        case XMLHttpRequest.DONE:
            document.querySelector("#loader").classList.remove("loader_active");
            let valutes = JSON.parse(this.response).response.Valute;
            localStorage.setItem("valutes", JSON.stringify(valutes));
            displayValutes(valutes);
            break;
        case XMLHttpRequest.LOADING:
            document.querySelector("#loader").classList.add("loader_active");
            break;
    }
});

xhr.send();