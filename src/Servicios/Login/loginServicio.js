import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/es",
    withCredentials: true, // Cambiado a true para permitir cookies
});


export const registoUsuario = async (username, password, email) => {

    try {
        const response = await api.post('/usuario/api/registro/', {
            username: username,
            password: password,
            email: email
        });
        console.log("Usuario registrado:", response.data);
        return response.data; // Retorna los datos de la respuesta

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }

};


export const loginUsuario = async (username, password) => {
  try {
    const response = await api.post('/usuario/api/login/', {
      username,
      password,
    });
    console.log("Usuario login:", response.data);
    return response.data; // Retorna { status, data: { access_token, refresh_token }, mensaje }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
