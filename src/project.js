import createListItem from "./listitem.js";

function renderProject(name, count) {
  const ul = document.querySelector("[data-projects-list]");

  ul.appendChild(createListItem(name, count));
}

export default renderProject;
