import "./styles/style.css";
import "./styles/login.css";
import { router } from "./routes/router.js";




document.addEventListener('DOMContentLoaded', () =>{
    const session = localStorage.getItem("session");

    if(session){
        // Si ya hay sesión, redirigimos al dashboard
        window.history.pushState({}, "", "/dashboard");
    }

    router()
})