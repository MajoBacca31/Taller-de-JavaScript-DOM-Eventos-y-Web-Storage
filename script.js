
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

function createTaskElement(taskText) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  listItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.className = 'delete-btn';

  deleteButton.addEventListener('click', () => {
    listItem.remove();
    saveTasks();
  });
  
  listItem.appendChild(deleteButton);
  return listItem;
}

function saveTasks() {
  const tasks = document.querySelectorAll('.task-item');
  const tasksArray = [];
  tasks.forEach(task => {
    const taskText = task.firstChild.textContent.trim();
    tasksArray.push(taskText);
  });
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON) {
    const tasksArray = JSON.parse(tasksJSON);
    tasksArray.forEach(taskText => {
      const newTask = createTaskElement(taskText);
      taskList.appendChild(newTask);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const newTask = createTaskElement(taskText);
      taskList.appendChild(newTask);
      taskInput.value = '';
      saveTasks();
    }
  });
});