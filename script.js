
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function createTaskElement(taskText) {

  const li = document.createElement("li");
  li.classList.add("task-item");

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  saveTasks();
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    createTaskElement(text);
    taskInput.value = "";
    taskInput.focus();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text !== "") {
      createTaskElement(text);
      taskInput.value = "";
    }
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item span").forEach((span) => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach((task) => createTaskElement(task));
  }
}

loadTasks();
