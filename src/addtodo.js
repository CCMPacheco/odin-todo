import { handleCreateTask, selectPriority } from "./index";

function createAddToDo() {
  const form = document.createElement("form");

  const divHeader = document.createElement("div");
  divHeader.classList.add("edit-header");
  form.appendChild(divHeader);

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("name", "");
  inputTitle.setAttribute("id", "");
  inputTitle.setAttribute("placeholder", "Title:");
  inputTitle.setAttribute("autocomplete", "off");

  divHeader.appendChild(inputTitle);

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
  lowBtn.setAttribute("type", "button");
  lowBtn.textContent = `LOW`;

  const mediumBtn = document.createElement("button");
  mediumBtn.classList.add("btn");
  mediumBtn.classList.add("btn-medium");
  mediumBtn.setAttribute("type", "button");
  mediumBtn.textContent = `MEDIUM`;

  const highBtn = document.createElement("button");
  highBtn.classList.add("btn");
  highBtn.classList.add("btn-high");
  highBtn.setAttribute("type", "button");
  highBtn.textContent = `HIGH`;

  divBtnRadio.appendChild(lowBtn);
  divBtnRadio.appendChild(mediumBtn);
  divBtnRadio.appendChild(highBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn");
  editBtn.setAttribute("type", "button");
  editBtn.textContent = `ADD TO DO`;
  form.appendChild(editBtn);

  selectPriority(lowBtn, mediumBtn, highBtn);
  handleCreateTask(
    editBtn,
    inputTitle,
    textarea,
    inputDate,
    lowBtn,
    mediumBtn,
    highBtn
  );

  return form;
}

function renderAddToDo() {
  const main = document.querySelector("[data-add-main]");
  main.textContent = ``;
  main.appendChild(createAddToDo());
}

export default renderAddToDo;
