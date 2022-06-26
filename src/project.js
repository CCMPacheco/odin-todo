import createListItem from "./listitem.js";

function renderProject(id, name, count) {
  const ul = document.querySelector("[data-projects-list]");

  ul.appendChild(createListItem(id, name, count));
}

export default renderProject;
