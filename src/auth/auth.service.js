export async function loginUser(name, email, password, role) {
    // Obtener todos los usuarios
    const res = await fetch(`http://localhost:3000/users`);
    const users = await res.json();

    // Validar manualmente en el cliente
    const user = users.find(u => 
        u.name.toLowerCase() === name.toLowerCase() &&
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role === role
    );

    return user || null;
}