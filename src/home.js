import createListItem from "./listitem.js";
import { openAdd, openNavigation } from "./index";

function createHeader() {
  const header = document.createElement("div");
  header.classList.add("title");

  const h1 = document.createElement("h1");
  h1.innerHTML = `TO-DO <i class="fa-solid fa-book"></i>`;

  const button = document.createElement("button");
  button.classList.add("icon");
  button.innerHTML = `<i class="fa-solid fa-bars"></i>`;

  header.appendChild(h1);
  header.appendChild(button);

  openNavigation(button);

  return header;
}

function createNavigation() {
  const nav = document.createElement("nav");
  nav.classList.add("navigation");
  nav.dataset.navigation = ``;

  const divContainer = document.createElement("div");
  nav.appendChild(divContainer);

  const button = document.createElement("button");
  button.dataset.openAdd = ``;
  button.innerHTML = `&#43;`;
  nav.appendChild(button);

  const divFilterInbox = document.createElement("div");
  divFilterInbox.classList.add("nav-links");
  divContainer.appendChild(divFilterInbox);

  const inbox = document.createElement("p");
  inbox.innerHTML = `<i class="fa-solid fa-inbox"></i> Inbox`;
  divFilterInbox.appendChild(inbox);

  const ulInbox = document.createElement("ul");
  divFilterInbox.appendChild(ulInbox);

  ulInbox.appendChild(createListItem("all", "All", 0));
  ulInbox.appendChild(createListItem("today", "Today", 0));
  ulInbox.appendChild(createListItem("next", "Next 7 days", 0));
  ulInbox.appendChild(createListItem("important", "Important", 0));

  const divProjects = document.createElement("div");
  divProjects.classList.add("nav-links");
  divContainer.appendChild(divProjects);

  const projects = document.createElement("p");
  projects.innerHTML = `<i class="fa-solid fa-list-check"></i> Projects`;
  divProjects.appendChild(projects);

  const ulProjects = document.createElement("ul");
  ulProjects.dataset.projectsList = ``;
  divProjects.appendChild(ulProjects);

  openAdd(button);

  return nav;
}

function createMainContainer() {
  const tasksContainer = document.createElement("main");
  tasksContainer.classList.add("tasks-container");
  tasksContainer.dataset.mainContainer = ``;

  return tasksContainer;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const icon = document.createElement("i");
  icon.classList.add("fa-brands");
  icon.classList.add("fa-github");

  const span = document.createElement("span");
  span.textContent = `https://github.com/CCMPacheco`;

  footer.appendChild(icon);
  footer.appendChild(span);

  return footer;
}

function loadHome() {
  const main = document.querySelector(".main-grid");
  main.textContent = ``;
  main.appendChild(createHeader());
  main.appendChild(createNavigation());
  main.appendChild(createMainContainer());
  main.appendChild(createFooter());
}

export default loadHome;
