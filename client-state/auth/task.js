if(window.localStorage.user_id) {
    document.querySelector("#user_id").textContent = window.localStorage.user_id;
    document.querySelector("#welcome").classList.add("welcome_active");
}

document.querySelector("#signin__form").addEventListener("submit", function(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.action);
    xhr.addEventListener("loadend", function() {
        // debugger;
        let r = JSON.parse(this.response);
        if(!r.success) {
            alert("invalid login/password");
            return;
        }
        window.localStorage.user_id = r.user_id;
        document.querySelector("#user_id").textContent = r.user_id;
        document.querySelector("#welcome").classList.add("welcome_active");
    });
    xhr.send(new FormData(this));
    this.login.value = "";
    this.password.value = "";
});

document.querySelector("#signout-btn").addEventListener("click", function() {
    if(confirm("Вы уверенны, что хотите выйти?")) {
        window.localStorage.removeItem("user_id");
        location.reload();
    };
});