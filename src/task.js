import { openDetails, openEdit, handleChecked, removeTask } from "./index";

function createTask(id, title, date, priority, completed) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.classList.add(priority);

  const spanName = document.createElement("span");
  spanName.classList.add("name");
  div.appendChild(spanName);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", id);
  input.checked = completed;

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerHTML = `<span class="custom-checkbox"></span>
    ${title}`;

  spanName.appendChild(input);
  spanName.appendChild(label);

  const spanSettings = document.createElement("span");
  spanSettings.classList.add("settings");
  div.appendChild(spanSettings);

  if (completed) {
    spanSettings.style.opacity = `0.5`;
  } else {
    spanSettings.style.opacity = `1`;
  }

  const buttonDetails = document.createElement("button");
  buttonDetails.classList.add("btn");
  buttonDetails.dataset.openDetails = ``;
  buttonDetails.setAttribute("type", "button");
  buttonDetails.textContent = `DETAILS`;

  const spanDate = document.createElement("span");
  spanDate.classList.add("date");
  spanDate.textContent = date;

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("icon");
  buttonEdit.setAttribute("type", "button");
  buttonEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("icon");
  buttonDelete.setAttribute("type", "button");
  buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

  spanSettings.appendChild(buttonDetails);
  spanSettings.appendChild(spanDate);
  spanSettings.appendChild(buttonEdit);
  spanSettings.appendChild(buttonDelete);

  removeTask(buttonDelete);
  handleChecked(input);
  openDetails(buttonDetails);
  openEdit(buttonEdit);

  return div;
}

function renderTask(id, title, date, priority, completed) {
  const main = document.querySelector(".tasks-container");

  main.appendChild(createTask(id, title, date, priority, completed));
}

export default renderTask;
