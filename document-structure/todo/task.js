// function test() {
//     window.localStorage.setItem("tasks", "1,2,3,4,5,6");
// }

// test();




const tasksListEl = document.querySelector("#tasks__list");
const taskInput = document.querySelector("#task__input");

let tasksList = window.localStorage.getItem("tasks").split(",");
for(let t of tasksList) {
    createTask(t);
}

function updateLocalTasks() {
    window.localStorage.setItem("tasks", String(tasksList));
}

function removeTask(event) {
    let taskIndex = Array.prototype.indexOf.call(tasksListEl.children, this.parentElement);
    tasksList.splice(taskIndex, 1);
    this.parentElement.remove();
    updateLocalTasks();
    event.preventDefault();

    console.log(tasksList);
    console.log(window.localStorage.getItem("tasks"));
}

function createTask(taskText) {
    let taskEl = document.createElement("div");
    taskEl.classList.add("task");
    // taskEl.dataset.id = tasksListEl.children.length;

    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task__title");
    taskTitle.textContent = taskText;

    let taskRemove = document.createElement("a");
    taskRemove.classList.add("task__remove");
    taskRemove.href = "#";
    taskRemove.addEventListener("click", removeTask);
    taskRemove.textContent = "×";

    taskEl.appendChild(taskTitle);
    taskEl.appendChild(taskRemove);

    tasksListEl.appendChild(taskEl);
}

document.querySelector(".tasks__add").addEventListener("click", function(event) {
    event.preventDefault();
    if(!taskInput.value.trim()) {
        alert("empty task is not valid")
        return;
    }
    createTask(taskInput.value);
    tasksList.push(taskInput.value);
    updateLocalTasks();
});