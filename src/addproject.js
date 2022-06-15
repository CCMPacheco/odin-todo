function createAddProject() {
  const form = document.createElement("form");

  const div = document.createElement("edit-header");
  div.classList.add("edit-header");
  form.appendChild(div);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "text");
  input.setAttribute("id", "text");
  input.setAttribute("placeholder", "Title:");
  input.setAttribute("autocomplete", "off");
  div.appendChild(input);

  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("add-project");
  button.setAttribute("type", "button");
  button.textContent = `ADD PROJECT`;
  form.appendChild(button);

  return form;
}

function renderAddProject() {
  const main = document.querySelector("[data-add-main]");
  main.textContent = ``;
  main.appendChild(createAddProject());
}

export default renderAddProject;
