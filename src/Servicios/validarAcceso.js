import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/es",
    withCredentials: true,
});


export const validarAcceso = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("No tiene acceso. Token no encontrado.");
    }
    try {
        const response = await api.get('/usuario/api/validar-autenticacion/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log("Usuario registrado:", response.data);
        return response.data; // Retorna los datos de la respuesta

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }

};
