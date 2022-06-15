function createTask(id, title, date, priority) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.classList.add(priority);

  const spanName = document.createElement("span");
  spanName.classList.add("name");
  div.appendChild(spanName);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", id);

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerHTML = `<span class="custom-checkbox"></span>
    ${title}`;

  spanName.appendChild(input);
  spanName.appendChild(label);

  const spanSettings = document.createElement("span");
  spanSettings.classList.add("settings");
  div.appendChild(spanSettings);

  const buttonDetails = document.createElement("button");
  buttonDetails.classList.add("btn");
  buttonDetails.textContent = `DETAILS`;

  const spanDate = document.createElement("span");
  spanDate.classList.add("date");
  spanDate.textContent = date;

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("icon");
  buttonEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("icon");
  buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

  spanSettings.appendChild(buttonDetails);
  spanSettings.appendChild(spanDate);
  spanSettings.appendChild(buttonEdit);
  spanSettings.appendChild(buttonDelete);

  return div;
}

function renderTask(id, title, date, priority) {
  const main = document.querySelector(".tasks-container");

  main.appendChild(createTask(id, title, date, priority));
}

export default renderTask;
