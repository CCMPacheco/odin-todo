import "./normalize.css";
import "./style.css";
import loadHome from "./home.js";
import loadModals from "./modal.js";

function initialize() {
  loadHome();
  loadModals();
}

initialize();
