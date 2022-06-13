import "./normalize.css";
import "./style.css";
import loadHome from "./home.js";

function initialize() {
  const mainGrid = document.querySelector(".main-grid");

  mainGrid.appendChild(loadHome());
}

initialize();
