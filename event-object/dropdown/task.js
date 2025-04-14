const dropdownVaue = document.querySelector(".dropdown__value");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownItems = dropdownList.querySelectorAll(".dropdown__item");

function toggleDropdown() {
    dropdownList.classList.toggle("dropdown__list_active");
}

function assignDropdownValue(event) {
    event.preventDefault();
    dropdownVaue.textContent = this.textContent;
    dropdownList.classList.toggle("dropdown__list_active");
}

dropdownVaue.addEventListener('click', toggleDropdown);
for(let item of dropdownItems) {
    item.addEventListener('click', assignDropdownValue);
}