function createDetailsModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("details");

  const divHeader = document.createElement("div");
  divHeader.classList.add("details-header");
  modal.appendChild(divHeader);

  const h3 = document.createElement("h3");
  h3.textContent = `get mail`;

  const button = document.createElement("button");
  button.classList.add("icon");
  button.innerHTML = `&#10005;`;

  divHeader.appendChild(h3);
  divHeader.appendChild(button);
  modal.appendChild(createDetailsDiv("Project:", "General"));
  modal.appendChild(createDetailsDiv("Priority:", "Low"));
  modal.appendChild(createDetailsDiv("Due date:", "June 8th, 2022"));
  modal.appendChild(
    createDetailsDiv("Details:", "check mail from bank regarding loan")
  );

  return modal;
}

function createEditModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("edit");

  const form = document.createElement("form");
  modal.appendChild(form);

  const divHeader = document.createElement("div");
  divHeader.classList.add("edit-header");
  form.appendChild(divHeader);

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("name", "");
  inputTitle.setAttribute("id", "");
  inputTitle.setAttribute("placeholder", "Title:");
  inputTitle.setAttribute("autocomplete", "off");

  const closeButton = document.createElement("button");
  closeButton.classList.add("icon");
  closeButton.innerHTML = `&#10005;`;

  divHeader.appendChild(inputTitle);
  divHeader.appendChild(closeButton);

  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "");
  textarea.setAttribute("id", "");
  textarea.setAttribute("cols", "");
  textarea.setAttribute("rows", "10");
  textarea.setAttribute("placeholder", "Details:");
  textarea.setAttribute("autocomplete", "off");
  form.appendChild(textarea);

  const divDate = document.createElement("div");
  divDate.classList.add("edit-date");
  form.appendChild(divDate);

  const label = document.createElement("label");
  label.setAttribute("for", "due-date");
  label.textContent = `Due Date: `;

  const divInputDate = document.createElement("div");

  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.setAttribute("name", "");
  inputDate.setAttribute("id", "due-date");
  divInputDate.appendChild(inputDate);

  divDate.appendChild(label);
  divDate.appendChild(divInputDate);

  const divEditRadio = document.createElement("div");
  divEditRadio.classList.add("edit-radio");
  form.appendChild(divEditRadio);

  const spanPriority = document.createElement("span");
  spanPriority.textContent = `Priority: `;
  divEditRadio.appendChild(spanPriority);

  const divBtnRadio = document.createElement("div");
  divBtnRadio.classList.add("btn-radio");
  divEditRadio.appendChild(divBtnRadio);

  const lowBtn = document.createElement("button");
  lowBtn.classList.add("btn");
  lowBtn.classList.add("btn-low");
  lowBtn.textContent = `LOW`;

  const mediumBtn = document.createElement("button");
  mediumBtn.classList.add("btn");
  mediumBtn.classList.add("btn-medium");
  mediumBtn.textContent = `MEDIUM`;

  const highBtn = document.createElement("button");
  highBtn.classList.add("btn");
  highBtn.classList.add("btn-high");
  highBtn.textContent = `HIGH`;

  divBtnRadio.appendChild(lowBtn);
  divBtnRadio.appendChild(mediumBtn);
  divBtnRadio.appendChild(highBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn");
  editBtn.textContent = `CONFIRM EDIT`;
  form.appendChild(editBtn);

  return modal;
}

function createAddModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("add");

  const divGrid = document.createElement("div");
  divGrid.classList.add("add-grid");
  modal.appendChild(divGrid);

  const divTitle = document.createElement("div");
  divTitle.classList.add("add-title");
  divGrid.appendChild(divTitle);

  const h2 = document.createElement("h2");
  h2.textContent = `Create a new...`;

  const closeButton = document.createElement("button");
  closeButton.classList.add("icon");
  closeButton.innerHTML = `&#10005;`;

  divTitle.appendChild(h2);
  divTitle.appendChild(closeButton);

  const nav = document.createElement("div");
  nav.classList.add("nav-links");
  divGrid.appendChild(nav);

  const ul = document.createElement("ul");
  nav.appendChild(ul);

  const liToDo = document.createElement("li");
  ul.appendChild(liToDo);

  const spanToDo = document.createElement("span");
  spanToDo.classList.add("filter-name");
  spanToDo.textContent = `TO - DO`;
  liToDo.appendChild(spanToDo);

  const liProject = document.createElement("li");
  ul.appendChild(liProject);

  const spanProject = document.createElement("span");
  spanProject.classList.add("filter-name");
  spanProject.textContent = `PROJECT`;
  liProject.appendChild(spanProject);

  const divMain = document.createElement("div");
  divMain.classList.add("edit");
  divMain.classList.add("add-main");
  divMain.dataset.editMain = ``;
  divGrid.appendChild(divMain);

  return modal;
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  return overlay;
}

function createDetailsDiv(category, info) {
  const div = document.createElement("div");
  div.classList.add("details-grid");

  const spanCategory = document.createElement("span");
  spanCategory.classList.add("details-category");
  spanCategory.textContent = category;

  const spanInfo = document.createElement("span");
  spanInfo.classList.add("details-info");
  spanInfo.textContent = info;

  div.appendChild(spanCategory);
  div.appendChild(spanInfo);

  return div;
}

function loadModals() {
  const body = document.getElementById("body");

  body.appendChild(createDetailsModal());
  body.appendChild(createEditModal());
  body.appendChild(createAddModal());
  body.appendChild(createOverlay());
}

export default loadModals;
