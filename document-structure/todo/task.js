const tasksListEl = document.querySelector("#tasks__list");
const taskInput = document.querySelector("#task__input");

void function() {
    let localTasksItem = window.localStorage.getItem("tasks");
    if(!localTasksItem) {
        return;
    }
    for(let t of localTasksItem.split(",")) {
        createTask(t);
    }
}();

function updateLocalTasks() {
    window.localStorage.setItem("tasks", Array.from(tasksListEl.querySelectorAll(".task__title")).map(e => e.textContent));
}

function removeTask(event) {
    this.parentElement.remove();
    updateLocalTasks();
    event.preventDefault();
}

function createTask(taskText) {
    tasksListEl.insertAdjacentHTML("beforeend", `
        <div class="task">
            <div class="task__title">${taskText}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `);
    tasksListEl.lastElementChild.querySelector(".task__remove").addEventListener("click", removeTask);
}

document.querySelector(".tasks__add").addEventListener("click", function(event) {
    event.preventDefault();
    if(!taskInput.value.trim()) {
        alert("empty task is not valid")
        return;
    }
    createTask(taskInput.value);
    updateLocalTasks();
});