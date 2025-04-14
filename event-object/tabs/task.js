const tabs = document.querySelector(".tab__navigation");
const tabContents = document.querySelector(".tab__contents");

let activeTab = () => tabs.querySelector(".tab_active");
let activeTabContent = () => tabContents.querySelector(".tab__content_active");

for(let tab of tabs.children) {
    tab.addEventListener("click", function(event) {
        let currentIndex = Array.from(tabs.children).indexOf(this);
        
        activeTab().classList.remove("tab_active");
        tabs.children[currentIndex].classList.add("tab_active");

        activeTabContent().classList.remove("tab__content_active");
        tabContents.children[currentIndex].classList.add("tab__content_active");
    });
}