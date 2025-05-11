class Cookie {
    static set(name, value) {
        document.cookie = `${name}=${encodeURIComponent(value)}`;
    }

    static get(name) {
        let cookies = document.cookie.split("; ");
        return cookies.find(c => c.startsWith(name + "="));
    }

    static delete(name) {
        // let cookieToDelete = Cookie.get(name);
        document.cookie = `${name}=;Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    static deleteAll() {
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
    }
}

let modal = document.querySelector("#subscribe-modal");

if(!Cookie.get("popupDisplayed")) {
    modal.classList.add("modal_active");
    Cookie.set("popupDisplayed", "true");
}

modal.querySelector(".modal__close").addEventListener("click", function() {
    modal.classList.remove("modal_active");    
})