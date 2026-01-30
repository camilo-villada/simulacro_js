import {router} from "../routes/router.js"

export function initDashboardController(){
    //verificar que hay sesion
    const session = localStorage.getItem("session");

    if(!session){
        window.history.pushState({}, "", "/login");
        router();
        return;
    }

    const user = JSON.parse(session);
    console.log("Dashboard cargado para: ", user.name)

    //Manejar logout
    const logoutBtn = document.getElementById("logout_btn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", () =>{
            localStorage.removeItem("session");
            window.history.pushState({}, "", "/login");
            router();
        });
    }

    //aqui puedes cargar los datos iniciales
    loadDashboardData();
}

async function loadDashboardData() {
    try{
        //cargar eventos desde la API
        const res = await fetch("http://localhost:3000/events");
        const events = await res.json();
        console.log("Eventos cargados: ", events);

        //actualizar estadisticas del dashboard
        updateStats(events);
    }catch(error){
        console.error("Error al cargar datos: ", error)
    }
}

function updateStats(events) {
    // Actualizar contadores
    const totalOrders = document.querySelector('.stat-card:nth-child(1) .stat-value');
    const pendingOrders = document.querySelector('.stat-card:nth-child(2) .stat-value');
    const revenue = document.querySelector('.stat-card:nth-child(3) .stat-value');
    
    if (totalOrders) totalOrders.textContent = events.length;
    
    const pending = events.filter(e => e.status === 'pending').length;
    if (pendingOrders) pendingOrders.textContent = pending;
    
    // Calcular revenue total
    const total = events.reduce((sum, event) => sum + (event.total || 0), 0);
    if (revenue) revenue.textContent = `$${total.toFixed(2)}`;
}