import {router} from "../routes/router.js"

export function initMenuController(){
    //verificar que hay sesion
    const session = localStorage.getItem("session");

    if(!session){
        window.history.pushState({}, "", "/login");
        router();
        return;
    }

    const user = JSON.parse(session);
    console.log("Menú cargado para: ", user.name)

    //Manejar logout
    const logoutBtn = document.getElementById("logout-btn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", () =>{
            localStorage.removeItem("session");
            window.history.pushState({}, "", "/login");
            router();
        });
    }

    // Aquí puedes agregar lógica para el carrito, filtros, etc.
    initMenuFeatures();
}

function initMenuFeatures() {
    // Manejar búsqueda
    const searchInput = document.querySelector('.search-input');
    if(searchInput){
        searchInput.addEventListener('input', (e) => {
            console.log('Buscando:', e.target.value);
            // Aquí puedes filtrar los items del menú
        });
    }

    // Manejar filtros de categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar active al botón clickeado
            btn.classList.add('active');
            console.log('Filtro seleccionado:', btn.textContent.trim());
        });
    });

    // Manejar botones "Add to order"
    const addButtons = document.querySelectorAll('.add-to-order-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const itemName = menuItem.querySelector('.item-name').textContent;
            const itemPrice = menuItem.querySelector('.item-price').textContent;
            console.log('Agregado al pedido:', itemName, itemPrice);
            // Aquí puedes agregar la lógica para el carrito
        });
    });
}
