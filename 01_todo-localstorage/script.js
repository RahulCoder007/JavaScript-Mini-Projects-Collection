document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTask = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });
  addTask.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    const textObj = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(textObj);
    todoInput.value = ""; //clear input
    saveTask();
    renderTask(textObj);
    console.log(tasks);
  });

  function renderTask(task) {
    // console.log(task);
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`;
    todoList.appendChild(li);
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
