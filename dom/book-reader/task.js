let book = document.querySelector(".book");

let fontsizeControlPanel = document.querySelector(".book__control_font-size");
let textcolControlPanel = document.querySelector(".book__control_color");
let backcolControlPanel = document.querySelector(".book__control_background");

function controlEventDecorator(propertyTemplate, activeControlClass, datasetProp, parent) {
    let currentControl = parent.querySelector("." + activeControlClass);
    
    return function(event) {
        if(Object.is(this, currentControl)) {
            event.preventDefault();
            return;
        }
        book.classList.remove(propertyTemplate + currentControl.dataset[datasetProp]);
        currentControl.classList.remove(activeControlClass);
        currentControl = this;
    
        this.classList.add(activeControlClass);
        book.classList.add(propertyTemplate + this.dataset[datasetProp]);
        event.preventDefault();
    };
}

let fsEvent = controlEventDecorator("book_fs-", "font-size_active", "size", fontsizeControlPanel);
for(let c of fontsizeControlPanel.querySelectorAll(".font-size")) {
    c.addEventListener("click", fsEvent);
}

let textcolEvent = controlEventDecorator("book_color-", "color_active", "textColor", textcolControlPanel);
for(let c of textcolControlPanel.querySelectorAll(".color")) {
    c.addEventListener("click", textcolEvent);
}

let bgcolEvent = controlEventDecorator("book_bg-", "color_active", "bgColor", backcolControlPanel);
for(let c of backcolControlPanel.querySelectorAll(".color")) {
    c.addEventListener("click", bgcolEvent);
}