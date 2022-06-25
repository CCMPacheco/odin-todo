import {
  closeDetails,
  closeEdit,
  closeAdd,
  closeNavigation,
  selectPriority,
  handleEdit,
} from "./index";

function createDetailsModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("details");
  modal.dataset.modalDetails = ``;

  const divHeader = document.createElement("div");
  divHeader.classList.add("details-header");
  modal.appendChild(divHeader);

  const h3 = document.createElement("h3");
  h3.dataset.detailsTitle = ``;
  h3.textContent = ``;

  const button = document.createElement("button");
  button.classList.add("icon");
  button.dataset.closeDetails = ``;
  button.setAttribute("type", "button");
  button.innerHTML = `&#10005;`;

  divHeader.appendChild(h3);
  divHeader.appendChild(button);
  modal.appendChild(createDetailsDiv("data-details-project", "Project:", ""));
  modal.appendChild(createDetailsDiv("data-details-priority", "Priority:", ""));
  modal.appendChild(createDetailsDiv("data-details-date", "Due date:", ""));
  modal.appendChild(
    createDetailsDiv("data-details-description", "Details:", "")
  );

  closeDetails(button);

  return modal;
}

function createEditModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("edit");
  modal.dataset.modalEdit = ``;

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
  inputTitle.dataset.editTitle = ``;

  const closeButton = document.createElement("button");
  closeButton.classList.add("icon");
  closeButton.dataset.closeEdit = ``;
  closeButton.setAttribute("type", "button");
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
  textarea.dataset.editDescription = ``;
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
  inputDate.dataset.editDate = ``;
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
  lowBtn.setAttribute("type", "button");
  lowBtn.dataset.editLow = ``;
  lowBtn.textContent = `LOW`;

  const mediumBtn = document.createElement("button");
  mediumBtn.classList.add("btn");
  mediumBtn.classList.add("btn-medium");
  mediumBtn.setAttribute("type", "button");
  mediumBtn.dataset.editMedium = ``;
  mediumBtn.textContent = `MEDIUM`;

  const highBtn = document.createElement("button");
  highBtn.classList.add("btn");
  highBtn.classList.add("btn-high");
  highBtn.setAttribute("type", "button");
  highBtn.dataset.editHigh = ``;
  highBtn.textContent = `HIGH`;

  divBtnRadio.appendChild(lowBtn);
  divBtnRadio.appendChild(mediumBtn);
  divBtnRadio.appendChild(highBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn");
  editBtn.setAttribute("type", "button");
  editBtn.dataset.editConfirm = ``;
  editBtn.textContent = `CONFIRM EDIT`;
  form.appendChild(editBtn);

  closeEdit(closeButton);
  selectPriority(lowBtn, mediumBtn, highBtn);
  handleEdit(
    editBtn,
    inputTitle,
    textarea,
    inputDate,
    lowBtn,
    mediumBtn,
    highBtn
  );

  return modal;
}

function createAddModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("add");
  modal.dataset.modalAdd = ``;

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
  closeButton.dataset.closeAdd = ``;
  closeButton.setAttribute("type", "button");
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
  spanToDo.classList.add("active");
  spanToDo.dataset.createAddTodo = ``;
  spanToDo.textContent = `TO - DO`;
  liToDo.appendChild(spanToDo);

  const liProject = document.createElement("li");
  ul.appendChild(liProject);

  const spanProject = document.createElement("span");
  spanProject.classList.add("filter-name");
  spanProject.dataset.createAddProject = ``;
  spanProject.textContent = `PROJECT`;
  liProject.appendChild(spanProject);

  const divMain = document.createElement("div");
  divMain.classList.add("edit");
  divMain.classList.add("add-main");
  divMain.dataset.addMain = ``;
  divGrid.appendChild(divMain);

  closeAdd(closeButton);

  return modal;
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.dataset.overlay = ``;

  closeNavigation(overlay);

  return overlay;
}

function createDetailsDiv(data, category, info) {
  const div = document.createElement("div");
  div.classList.add("details-grid");

  const spanCategory = document.createElement("span");
  spanCategory.classList.add("details-category");
  spanCategory.textContent = category;

  const spanInfo = document.createElement("span");
  spanInfo.classList.add("details-info");
  spanInfo.setAttribute(`${data}`, "");
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
