import axios from "axios";


const accessToken = localStorage.getItem("access_token");

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const csrf_tokrn = getCookie('csrftoken');

console.log(accessToken);
const api = axios.create({
    baseURL: "https://tiendaonline-1gvm.onrender.com/es",
    headers: {
        'Authorization': `Bearer ${accessToken}`, // corregido el typo
                    'X-CSRFToken': csrf_tokrn,
    },
    withCredentials: true // permite el envío/recepción de cookies
});


export const obtenerCarrito = async () => {
    try {
        const response = await axios.get('https://tiendaonline-1gvm.onrender.com/es/productos/api/carrito/',
            {
                headers: {
                    'X-CSRFToken': csrf_tokrn,
                },
                withCredentials: true // permite el envío/recepción de cookies
            }   
        );
        // alert("Productos obtenidos: "+ response.data.data[0].nombre);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

export const agregarCarrito = async (data) => {
    const csrf_tokrn = getCookie('csrftoken');
    try {
        const response = await axios.post('https://tiendaonline-1gvm.onrender.com/es/productos/api/carrito/', 
            data,
            {
                
                headers: {
                    'X-CSRFToken': csrf_tokrn,
                },
                withCredentials: true // permite el envío/recepción de cookies
            }   
        );
        // alert("Productos obtenidos: "+ response.data.data[0].nombre);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};



export const actualizarItemCarrito = async (id, data) => {
    const csrf_tokrn = getCookie('csrftoken');
    try {
        const response = await axios.put(`https://tiendaonline-1gvm.onrender.com/es/productos/api/item-carrito/${id}/`, 
            data,
            {
                
                headers: {
                    'X-CSRFToken': csrf_tokrn,
                },
                withCredentials: true // permite el envío/recepción de cookies
            }   
        );
        // alert("Productos obtenidos: "+ response.data.data[0].nombre);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

export const eliminarItemCarrito= async (id) => {
    const csrf_tokrn = getCookie('csrftoken');
    console.log('id', id);
    try {
        const response = await axios.delete(`https://tiendaonline-1gvm.onrender.com/es/productos/api/item-carrito/${id}/`, 
            {

                headers: {
                    'X-CSRFToken': csrf_tokrn,
                },
            }   
        );
        // alert("Productos obtenidos: "+ response.data.data[0].nombre);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

