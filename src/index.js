import "./normalize.css";
import "./style.css";
import loadHome from "./home.js";
import loadModals from "./modal.js";
import renderTask from "./task.js";
import renderProject from "./project.js";

function initialize() {
  loadHome();
  loadModals();
  renderProject("Gym", 10);
  renderTask("task-1", "get mail", "June 8th", "medium-priority");
}

initialize();
