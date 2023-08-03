import { type } from "os";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean,
  createdAt: Date,
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();

tasks.forEach((task) => {
  addListItem(task);
});

form?.addEventListener("submit", e => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = "";
})


function addListItem(task: Task) {
  const item = document.createElement("li");
  const div = document.createElement("div");
  const inputHelper = document.createElement("i");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    saveTasks();
  })
  checkBox.classList.add("checkbox");
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;

  label.classList.add("form-check-label");
  inputHelper.classList.add("input-helper");
  label.append(checkBox, task.title, inputHelper);
  div.classList.add("form-check");
  div.append(label);
  item.append(div);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS");

  if (taskJson == null) return []

  return JSON.parse(taskJson);
}
