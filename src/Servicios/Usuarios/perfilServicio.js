import axios from "axios";


const accessToken = localStorage.getItem("access_token");

console.log(accessToken);
const api = axios.create({
    baseURL: "http://localhost:8000/es",
    headers: {
        'Authorization': `Bearer ${accessToken}` // corregido el typo
    },
    withCredentials: true // permite el envío/recepción de cookies
});


export const perfilUsuario = async () => {
    const response = await axios.get('http://localhost:8000/es/usuario/api/perfil/',
        {
            headers: {
                'Authorization': `Bearer ${accessToken}` // corregido el typo
            },
            withCredentials: true // permite el envío/recepción de cookies
        }   
    );
    return response.data;
};

export const perfilUsuario2 = async () => {
    console.log(accessToken);
    try {
        const response = await api.get('/usuario/api/perfil/');
        console.log("Perfil usuario:", response.data);
        return response.data; // Retorna los datos de la respuesta

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }

};


export const actualizarPerfil = async (data) => {

    try {
        const response = await axios.put('http://localhost:8000/es/usuario/api/perfil/', data,
            {
            headers: {
                'Authorization': `Bearer ${accessToken}`, // corregido el typo
                // 'Content-Type': 'application/json'
            },
            withCredentials: true // permite el envío/recepción de cookies
        }
        );
        console.log("Perfil actualizado:", response.data);
        return response.data; // Retorna los datos de la respuesta

    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
    }
};