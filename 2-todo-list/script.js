/**
 * DOM Task Tracker
 * Author: Omkar Kumbhar
 * Modular local-storage backed list manager
 */

const taskForm = document.getElementById("taskForm");
const taskInputField = document.getElementById("taskInput");
const taskListContainer = document.getElementById("taskList");
const counterBadge = document.getElementById("counter");
const emptyStateNotice = document.getElementById("emptyMsg");

// Load tasks from persistent storage
let storedTasks = retrieveSavedTasks();

function retrieveSavedTasks() {
  try {
    const raw = localStorage.getItem("omkar_tasks");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Storage access failed, using in-memory state.", err);
    return [];
  }
}

function persistTasks() {
  try {
    localStorage.setItem("omkar_tasks", JSON.stringify(storedTasks));
  } catch (err) {
    console.warn("Unable to save tasks to local storage.", err);
  }
}

function createNewTask(title) {
  const newTask = {
    id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    text: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  storedTasks.unshift(newTask);
  persistTasks();
  refreshUI();
}

function toggleTaskStatus(targetId) {
  storedTasks = storedTasks.map((item) =>
    item.id === targetId ? { ...item, completed: !item.completed } : item
  );
  persistTasks();
  refreshUI();
}

function removeTask(targetId) {
  storedTasks = storedTasks.filter((item) => item.id !== targetId);
  persistTasks();
  refreshUI();
}

function refreshUI() {
  taskListContainer.innerHTML = "";

  storedTasks.forEach((item) => {
    const li = document.createElement("li");
    li.className = `task-item ${item.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = item.completed;
    checkbox.setAttribute("aria-label", `Mark "${item.text}" as ${item.completed ? "incomplete" : "complete"}`);
    checkbox.addEventListener("change", () => toggleTaskStatus(item.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = item.text;

    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete";
    delBtn.innerHTML = "&times;";
    delBtn.setAttribute("aria-label", "Remove task");
    delBtn.title = "Delete task";
    delBtn.addEventListener("click", () => removeTask(item.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskListContainer.appendChild(li);
  });

  const total = storedTasks.length;
  const activeCount = storedTasks.filter((t) => !t.completed).length;

  if (total === 0) {
    counterBadge.textContent = "No tasks";
    emptyStateNotice.style.display = "block";
  } else {
    counterBadge.textContent = `${activeCount} of ${total} pending`;
    emptyStateNotice.style.display = "none";
  }
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const trimmed = taskInputField.value.trim();
  if (!trimmed) return;
  createNewTask(trimmed);
  taskInputField.value = "";
});

// Initial mount
refreshUI();
