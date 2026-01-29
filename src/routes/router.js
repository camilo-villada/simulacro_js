import Login from '../pages/login.js';
import Dashboard from "../pages/dashboard.js";
import { initLoginController } from "../auth/login.controller.js";
import { initDashboardController } from "../auth/dashboard.controller.js";


const routes = {
  "/": Login,
  "/login": Login,
  "/dashboard": Dashboard
};

export function router(){
  const path = window.location.pathname;
  const view = routes[path] || Login;

  const app = document.getElementById("app");
  app.innerHTML = view();

  // Inicializar controlador si estamos en login
  if(path === "/" || path === "/login"){
    initLoginController()
  }

  if(path === "/dashboard"){
    initDashboardController();
  }
}

  