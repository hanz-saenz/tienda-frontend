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
    baseURL: "http://localhost:8000/es",
    headers: {
        'Authorization': `Bearer ${accessToken}`, // corregido el typo
                    'X-CSRFToken': csrf_tokrn,
    },
    withCredentials: true // permite el envío/recepción de cookies
});


export const listarProductos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/es/productos/api/productos/lista',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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

export const crearProducto = async (data) => {
    const csrf_tokrn = getCookie('csrftoken');
    try {
        const response = await axios.post('http://localhost:8000/es/productos/api/productos/lista', 
            data,
            {
                
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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

export const listarCategorias = async () => {
    try {
        const response = await axios.get('http://localhost:8000/es/productos/api/productos/categorias',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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

export const listarProveedores = async () => {
    try {
        const response = await axios.get('http://localhost:8000/es/productos/api/productos/proveedores',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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


export const listarMarcas= async () => {
    try {
        const response = await axios.get('http://localhost:8000/es/productos/api/productos/marcas',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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


export const actualizarProducto = async (id, data) => {
    const csrf_tokrn = getCookie('csrftoken');
    try {
        const response = await axios.put(`http://localhost:8000/es/productos/api/productos/lista/${id}/`, 
            data,
            {
                
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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

export const eliminarProducto = async (id) => {
    const csrf_tokrn = getCookie('csrftoken');
    try {
        const response = await axios.delete(`http://localhost:8000/es/productos/api/productos/lista/${id}/`, 
            {

                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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


export const obtenerDetalleProducto = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/es/productos/api/productos/lista/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // corregido el typo
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