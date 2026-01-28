export async function loginUser(email, password, role) {
    const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}&role=${role}`);

    const users = await res.json();

    // Si existe un usuario con esas credenciales, lo devolvemos
    return users.length > 0 ? users[0] : null;
    
}