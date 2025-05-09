const tooltip = document.querySelector("#tooltip1");

document.querySelectorAll(".has-tooltip").forEach(e => {
    e.addEventListener("mouseover", function(event) {
        tooltip.textContent = this.title;
        tooltip.classList.toggle("tooltip_active");

        let elRect = this.getBoundingClientRect();
        let tipRect = tooltip.getBoundingClientRect();

        tooltip.style.left = elRect.left + elRect.width / 2 - tipRect.width / 2 + "px";
        tooltip.style.top = elRect.top + elRect.height / 2 - tipRect.height / 2 + "px";

        switch(this.dataset.position) {
            case "top":
                tooltip.style.setProperty("--dy", -elRect.height/2 - tipRect.height/2 - 5 + "px");
                break;
            case "right":
                tooltip.style.setProperty("--dx", elRect.width/2 + tipRect.width/2 + 15 + "px");
                break;
            case "bottom":
                tooltip.style.setProperty("--dy", elRect.height/2 + tipRect.height/2 + 5 + "px");
                break;
            case "left":
                tooltip.style.setProperty("--dx", -elRect.width/2 - tipRect.width/2 - 15 + "px");
                break;

            default:
                tooltip.style.setProperty("--dx", elRect.width/2 + tipRect.width/2 + 15 + "px");
                break;
        }
    });
    e.addEventListener("mouseout", function(event) {
        tooltip.style.setProperty("--dy", "0px");
        tooltip.style.setProperty("--dx", "0px");
        tooltip.classList.toggle("tooltip_active");
    });
})