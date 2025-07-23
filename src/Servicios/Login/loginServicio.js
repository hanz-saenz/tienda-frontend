import axios from "axios";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const csrftoken = getCookie('csrftoken');
const api = axios.create({
    baseURL: "http://localhost:8000/es",
    headers: {
        'X-CSRFToken': csrftoken
    },
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


export const logoutUsuario = async () =>{

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return window.location.href = "/login";
}