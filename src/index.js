import "./normalize.css";
import "./style.css";
import loadHome from "./home.js";
import loadModals from "./modal.js";
import renderTask from "./task.js";
import renderProject from "./project.js";
import renderAddToDo from "./addtodo.js";
import renderAddProject from "./addproject.js";
import { format, parseISO } from "date-fns";

const LOCAL_STORAGE_PROJECT_KEY = "project.lists";
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const editId = { id: "" };

let projectsList = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)
) || [{ id: "", title: "", tasks: 0 }];

let tasksList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [
  {
    id: "",
    title: "",
    project: "",
    priority: "",
    date: "",
    details: "",
    completed: false,
  },
];

window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier == "U+000A" ||
      e.keyIdentifier == "Enter" ||
      e.keyCode == 13
    ) {
      if (e.target.nodeName == "INPUT" && e.target.type == "text") {
        e.preventDefault();
        return false;
      }
    }
  },
  true
);

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projectsList));
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(tasksList));
}

function removeTask(btn) {
  btn.addEventListener("click", (e) => {
    const id =
      e.target.parentNode.parentNode.parentNode.firstChild.firstChild.id;

    tasksList = tasksList.filter((task) => task.id !== id);
    save();
    e.target.parentNode.parentNode.parentNode.remove();
  });
}

function handleChecked(checkbox) {
  checkbox.addEventListener("click", (e) => {
    const id = e.target.id;
    const settings = e.target.parentNode.parentNode.lastChild;

    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].id === id) {
        tasksList[i].completed = !tasksList[i].completed;
        if (tasksList[i].completed) {
          settings.style.opacity = `0.5`;
        } else {
          settings.style.opacity = `1`;
        }
      }
    }
    save();
  });
}

function handleEdit(confirm, title, details, date, low, medium, high) {
  confirm.addEventListener("click", (e) => {
    e.preventDefault();

    const regex = /^\s*$/;

    if (title.value === "") return;
    if (regex.test(title.value)) return;
    if (date.value === "") return;

    const idTask = editId.id;
    const task = title.value.trim().replace(/<|>/g, ``);
    const projectName = "General";
    const description = details.value.trim();
    const dueDate = date.value;
    const formatDate = format(parseISO(dueDate), "MMM do");
    let priorityTask = "";

    if (low.classList.contains("active")) {
      priorityTask = "low-priority";
    }

    if (medium.classList.contains("active")) {
      priorityTask = "medium-priority";
    }

    if (high.classList.contains("active")) {
      priorityTask = "high-priority";
    }

    if (priorityTask === "") return;

    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].id === idTask) {
        tasksList[i].title = task;
        tasksList[i].project = projectName;
        tasksList[i].details = description;
        tasksList[i].date = dueDate;
        tasksList[i].priority = priorityTask;
      }
    }
    save();
    updateTask(idTask, task, formatDate, priorityTask);
    closeEditModal();
  });
}

function updateTask(id, title, date, priority) {
  const taskItem = document.getElementById(id);
  const taskItemTitle = taskItem.parentNode.lastChild;
  const taskItemDate =
    taskItem.parentNode.parentNode.lastChild.firstChild.nextSibling;
  const taskItemPriority = taskItem.parentNode.parentNode;

  taskItemTitle.innerHTML = `<span class="custom-checkbox"></span>
  ${title}`;
  taskItemDate.textContent = date;
  taskItemPriority.classList.remove("low-priority");
  taskItemPriority.classList.remove("medium-priority");
  taskItemPriority.classList.remove("high-priority");
  taskItemPriority.classList.add(priority);
}

function handleCreateTask(button, title, details, date, low, medium, high) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const regex = /^\s*$/;

    if (title.value === "") return;
    if (regex.test(title.value)) return;
    if (date.value === "") return;

    const idTask = Date.now().toString();
    const task = title.value.trim().replace(/<|>/g, ``);
    const projectName = "General";
    const description = details.value.trim();
    const dueDate = date.value;
    const formatDate = format(parseISO(dueDate), "MMM do");
    let priorityTask = "";

    if (low.classList.contains("active")) {
      priorityTask = "low-priority";
    }

    if (medium.classList.contains("active")) {
      priorityTask = "medium-priority";
    }

    if (high.classList.contains("active")) {
      priorityTask = "high-priority";
    }

    if (priorityTask === "") return;

    tasksList.push({
      id: idTask,
      title: task,
      project: projectName,
      priority: priorityTask,
      date: dueDate,
      details: description,
      completed: false,
    });

    save();
    renderTask(idTask, task, formatDate, priorityTask, false);
    closeAddModal();
  });
}

function renderTasksList() {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id) {
      renderTask(
        tasksList[i].id,
        tasksList[i].title,
        format(parseISO(tasksList[i].date), "MMM do"),
        tasksList[i].priority,
        tasksList[i].completed
      );
    }
  }
}

function createProject(button, title) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const regex = /^\s*$/;

    if (title.value === "") return;
    if (regex.test(title.value)) return;

    const project = title.value.trim();
    const idProject = Date.now().toString();
    const initial = 0;

    projectsList.push({ id: idProject, title: project, tasks: initial });
    save();
    renderProject(project, initial);
    closeAddModal();
    handleActiveLink();
  });
}

function renderProjectsList() {
  for (let i = 0; i < projectsList.length; i++) {
    if (projectsList[i].id) {
      renderProject(projectsList[i].title, projectsList[i].tasks);
    }
  }
}

function handleActiveLink(initial) {
  if (initial) {
    setActiveLink(initial);
  }

  const links = document.querySelectorAll("[data-filter-nav]");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      setActiveLink(link);
    });
  });
}

function setActiveLink(link) {
  const links = document.querySelectorAll("[data-filter-nav]");

  links.forEach((link) => {
    if (link !== this) {
      link.classList.remove("active");
    }
  });

  link.classList.add("active");
}

function selectPriority(btnLow, btnMedium, btnHigh) {
  btnLow.addEventListener("click", () => {
    btnLow.classList.remove("active");
    btnMedium.classList.remove("active");
    btnHigh.classList.remove("active");
    btnLow.classList.add("active");
  });

  btnMedium.addEventListener("click", () => {
    btnLow.classList.remove("active");
    btnMedium.classList.remove("active");
    btnHigh.classList.remove("active");
    btnMedium.classList.add("active");
  });

  btnHigh.addEventListener("click", () => {
    btnLow.classList.remove("active");
    btnMedium.classList.remove("active");
    btnHigh.classList.remove("active");
    btnHigh.classList.add("active");
  });
}

function openNavigation(btn) {
  btn.addEventListener("click", () => {
    const navigation = document.querySelector("[data-navigation]");
    const overlay = document.querySelector("[data-overlay]");
    navigation.classList.add("active");
    overlay.classList.add("active");
  });
}

function closeNavigation(overlay) {
  overlay.addEventListener("click", () => {
    const navigation = document.querySelector("[data-navigation]");

    if (navigation.classList.contains("active")) {
      navigation.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
}

function openDetails(btn) {
  btn.addEventListener("click", (e) => {
    const modal = document.querySelector("[data-modal-details]");
    const overlay = document.querySelector("[data-overlay]");
    modal.classList.add("active");
    overlay.classList.add("active");

    const title = document.querySelector("[data-details-title]");
    const project = document.querySelector("[data-details-project]");
    const priority = document.querySelector("[data-details-priority]");
    const date = document.querySelector("[data-details-date]");
    const description = document.querySelector("[data-details-description]");
    const id = e.target.parentNode.parentNode.firstChild.firstChild.id;

    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].id === id) {
        const formatedDate = format(
          parseISO(tasksList[i].date),
          "MMMM do yyyy"
        );
        const string = tasksList[i].priority.split("-");
        const first = string[0].charAt(0).toUpperCase();
        const rest = string[0].slice(1);
        const formatedPriority = first + rest;

        title.textContent = tasksList[i].title;
        project.textContent = tasksList[i].project;
        priority.textContent = formatedPriority;
        date.textContent = formatedDate;
        description.textContent = tasksList[i].details;
      }
    }
  });
}

function closeDetails(btn) {
  btn.addEventListener("click", () => {
    const modal = document.querySelector("[data-modal-details]");
    const overlay = document.querySelector("[data-overlay]");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
}

function openEdit(btn) {
  btn.addEventListener("click", (e) => {
    const modal = document.querySelector("[data-modal-edit]");
    const overlay = document.querySelector("[data-overlay]");
    modal.classList.add("active");
    overlay.classList.add("active");

    const title = document.querySelector("[data-edit-title]");
    const description = document.querySelector("[data-edit-description]");
    const date = document.querySelector("[data-edit-date]");
    const low = document.querySelector("[data-edit-low]");
    const medium = document.querySelector("[data-edit-medium]");
    const high = document.querySelector("[data-edit-high]");
    const id =
      e.target.parentNode.parentNode.parentNode.firstChild.firstChild.id;

    editId.id = id;

    for (let i = 0; i < tasksList.length; i++) {
      if (tasksList[i].id === id) {
        title.value = tasksList[i].title;
        description.value = tasksList[i].details;
        date.value = tasksList[i].date;

        if (tasksList[i].priority === "low-priority") {
          low.classList.remove("active");
          medium.classList.remove("active");
          high.classList.remove("active");
          low.classList.add("active");
        }

        if (tasksList[i].priority === "medium-priority") {
          low.classList.remove("active");
          medium.classList.remove("active");
          high.classList.remove("active");
          medium.classList.add("active");
        }

        if (tasksList[i].priority === "high-priority") {
          low.classList.remove("active");
          medium.classList.remove("active");
          high.classList.remove("active");
          high.classList.add("active");
        }
      }
    }
  });
}

function openAdd(btn) {
  btn.addEventListener("click", () => {
    const modal = document.querySelector("[data-modal-add]");
    const overlay = document.querySelector("[data-overlay]");
    const todo = document.querySelector("[data-create-add-todo]");
    const project = document.querySelector("[data-create-add-project]");
    const navigation = document.querySelector("[data-navigation]");

    navigation.classList.remove("active");
    modal.classList.add("active");
    overlay.classList.add("active");

    if (todo.classList.contains("active")) {
      renderAddToDo();
    }

    todo.addEventListener("click", () => {
      project.classList.remove("active");
      todo.classList.add("active");
      renderAddToDo();
    });

    project.addEventListener("click", () => {
      todo.classList.remove("active");
      project.classList.add("active");
      renderAddProject();
    });
  });
}

function closeAdd(btn) {
  btn.addEventListener("click", () => {
    closeAddModal();
  });
}

function closeEdit(btn) {
  btn.addEventListener("click", () => {
    closeEditModal();
  });
}

function closeAddModal() {
  const modal = document.querySelector("[data-modal-add]");
  const overlay = document.querySelector("[data-overlay]");
  const todo = document.querySelector("[data-create-add-todo]");
  const project = document.querySelector("[data-create-add-project]");

  modal.classList.remove("active");
  overlay.classList.remove("active");

  if (project.classList.contains("active")) {
    project.classList.remove("active");
    todo.classList.add("active");
  }
}

function closeEditModal() {
  const modal = document.querySelector("[data-modal-edit]");
  const overlay = document.querySelector("[data-overlay]");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function initialize() {
  loadHome();
  loadModals();
  renderProjectsList();
  renderTasksList();
  handleActiveLink(document.querySelector("[data-filter-nav]"));
}

initialize();

export {
  openDetails,
  openEdit,
  openAdd,
  openNavigation,
  closeDetails,
  closeEdit,
  closeAdd,
  closeNavigation,
  createProject,
  handleCreateTask,
  handleEdit,
  handleChecked,
  selectPriority,
  removeTask,
};
