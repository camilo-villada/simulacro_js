import { loginUser } from "./auth.service.js"; 
import { router } from "../routes/router.js";


export function initLoginController(){
    const form = document.querySelector(".login_form");

    form.addEventListener("submit", async (e) =>{
        e.preventDefault();

        const email = form.email.value; 
        const password = form.password.value; 
        const role = form.role.value;

        try{
            const user = await loginUser(email, password, role);

            if(user){

                // Guardar sesion en localstorage
                localStorage.setItem("session", JSON.stringify(user))

                //Redirigir al dashboard
                window.history.pushState({}, "", "/dashboard");
                router();
            }else{
                alert("Credenciales invalidas");
            }
        }catch(err){
            console.error("Error en login", err);
        }
    })
}