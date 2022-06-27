import "./normalize.css";
import "./style.css";
import loadHome from "./home.js";
import loadModals from "./modal.js";
import renderTask from "./task.js";
import renderProject from "./project.js";
import renderAddToDo from "./addtodo.js";
import renderAddProject from "./addproject.js";
import { format, parseISO, addDays, isBefore, isAfter } from "date-fns";

const LOCAL_STORAGE_PROJECT_KEY = "project.lists";
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const editId = { id: "" };
const active = { link: "" };

let projectsList =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

let tasksList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

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

function renderAll() {
  if (tasksList.length !== 0) {
    renderTasksList(tasksList);
    return;
  }

  renderEmptyInbox();
}

function renderToday() {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayTasks = tasksList.filter((task) => task.date === today);

  if (todayTasks.length !== 0) {
    renderTasksList(todayTasks);
    return;
  }

  renderEmptyInbox();
}

function renderNextSevenDays() {
  const today = format(new Date(), "yyyy-MM-dd");
  const eight = format(addDays(parseISO(today), 8), "yyyy-MM-dd");

  const nextSevenDays = tasksList.filter(
    (task) =>
      isAfter(parseISO(task.date), parseISO(today)) &&
      isBefore(parseISO(task.date), parseISO(eight))
  );

  if (nextSevenDays.length !== 0) {
    renderTasksList(nextSevenDays);
    return;
  }

  renderEmptyInbox();
}

function renderImportant() {
  const important = tasksList.filter(
    (task) => task.priority === "high-priority"
  );

  if (important.length !== 0) {
    renderTasksList(important);
    return;
  }

  renderEmptyInbox();
}

function renderSelectedProject(link) {
  const project = projectsList.filter((project) => link.id === project.id);
  const tasks = tasksList.filter((task) => project[0].title === task.project);

  if (tasks.length !== 0) {
    renderTasksList(tasks);
    return;
  }

  renderEmptyProject();
}

function renderEmptyInbox() {
  const main = document.querySelector("[data-main-container]");
  main.textContent = ``;

  const p = document.createElement("p");
  p.dataset.emptyInbox = ``;
  p.textContent = `No Tasks`;

  main.appendChild(p);
}

function renderEmptyProject() {
  const main = document.querySelector("[data-main-container]");
  main.textContent = ``;

  const p = document.createElement("p");
  p.dataset.emptyInbox = ``;
  p.textContent = `No Tasks`;

  const button = document.createElement("button");
  button.dataset.deleteProject = ``;
  button.classList.add("btn");
  button.textContent = `Delete Project`;

  main.appendChild(p);
  main.appendChild(button);

  button.addEventListener("click", () => {
    const id = active.link.id;
    projectsList = projectsList.filter((project) => project.id !== id);
    save();
    renderAll();
    renderProjectsList();
    handleActiveLink(document.querySelector("[data-filter-nav]"));
  });
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
    renderCount();
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
    const description = details.value.trim();
    const dueDate = date.value;
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
        tasksList[i].details = description;
        tasksList[i].date = dueDate;
        tasksList[i].priority = priorityTask;
      }
    }
    save();
    selectRenderList();
    closeEditModal();
  });
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
    let projectName = "General";
    const description = details.value.trim();
    const dueDate = date.value;
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

    const check = projectsList.filter(
      (project) => active.link.textContent === project.title
    );
    if (check.length !== 0) {
      projectName = active.link.textContent;
    }

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
    renderCount();
    selectRenderList();
    closeAddModal();
  });
}

function selectRenderList() {
  if (active.link.id === "all") {
    renderAll();
    return;
  }

  if (active.link.id === "today") {
    renderToday();
    return;
  }

  if (active.link.id === "next") {
    renderNextSevenDays();
    return;
  }

  if (active.link.id === "important") {
    renderImportant();
    return;
  }

  renderSelectedProject(active.link);
}

function renderTasksList(list) {
  const main = document.querySelector("[data-main-container]");
  main.textContent = ``;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id) {
      renderTask(
        list[i].id,
        list[i].title,
        format(parseISO(list[i].date), "MMM do"),
        list[i].priority,
        list[i].completed
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
    renderProject(idProject, project, initial);
    closeAddModal();
    handleActiveLink();
  });
}

function renderProjectsList() {
  const ul = document.querySelector("[data-projects-list]");
  ul.textContent = ``;

  for (let i = 0; i < projectsList.length; i++) {
    if (projectsList[i].id) {
      renderProject(
        projectsList[i].id,
        projectsList[i].title,
        projectsList[i].tasks
      );
    }
  }
}

function renderCount() {
  const all = document.getElementById("all");
  const allCount = tasksList.filter((task) => !task.completed).length;

  getCount(all, allCount);

  const today = document.getElementById("today");
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const todayCount = tasksList.filter(
    (task) => task.date === todayDate && !task.completed
  ).length;

  getCount(today, todayCount);

  const nextSevenDays = document.getElementById("next");
  const eight = format(addDays(parseISO(todayDate), 8), "yyyy-MM-dd");
  const nextSevenDaysCount = tasksList.filter(
    (task) =>
      isAfter(parseISO(task.date), parseISO(todayDate)) &&
      isBefore(parseISO(task.date), parseISO(eight)) &&
      !task.completed
  ).length;

  getCount(nextSevenDays, nextSevenDaysCount);

  const important = document.getElementById("important");
  const importantCount = tasksList.filter(
    (task) => task.priority === "high-priority" && !task.completed
  ).length;

  getCount(important, importantCount);
  projectCount();
}

function getCount(node, count) {
  if (count) {
    node.nextSibling.textContent = count;
    node.nextSibling.style.display = ``;
  } else {
    node.nextSibling.style.display = `none`;
  }
}

function projectCount() {
  for (let i = 0; i < projectsList.length; i++) {
    const project = document.getElementById(projectsList[i].id);
    const count = tasksList.filter(
      (task) => task.project === projectsList[i].title && !task.completed
    ).length;

    getCount(project, count);
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
      renderCount();
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
  active.link = link;

  if (link.textContent === `All`) {
    renderAll();
    return;
  }

  if (link.textContent === `Today`) {
    renderToday();
    return;
  }

  if (link.textContent === `Next 7 days`) {
    renderNextSevenDays();
    return;
  }

  if (link.textContent === `Important`) {
    renderImportant();
    return;
  }

  renderSelectedProject(link);
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
  renderTasksList(tasksList);
  renderCount();
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
