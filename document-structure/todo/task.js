const tasksList = document.querySelector("#tasks__list");
tasksList.innerHTML = window.localStorage.getItem("localTasks") || "";

const taskInput = document.querySelector("#task__input");

function updateLocalTasks() {
    window.localStorage.setItem("localTasks", tasksList.innerHTML);
}

document.querySelector(".tasks__add").addEventListener("click", function(event) {
    tasksList.innerHTML += `
        <div class="task">
            <div class="task__title">${taskInput.value}</div>
            <a href="#" class="task__remove" onclick="this.parentElement.remove(); updateLocalTasks();">&times;</a>
        </div>
    `;
    updateLocalTasks();
});