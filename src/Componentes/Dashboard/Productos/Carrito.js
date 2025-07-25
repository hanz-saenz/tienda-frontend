import React, { useState, useEffect } from "react";
import NavbarWithDrawer from "../../Dashboard/NavbarWithDrawer";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Table, InputNumber } from "antd"; // Asegúrate de importar Table desde antd
import { listarProductosDetalle } from "../../../Servicios/Productos/productosServicio";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import { obtenerCarrito, eliminarItemCarrito } from "../../../Servicios/Productos/carritoServicio";

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    const obtenerDatosCarrito = async () => {
        try {
            const response = await obtenerCarrito();
            setCarrito(response.data.items);
            console.log("Productos obtenidos:", response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        obtenerDatosCarrito();
    }, []);
    const handleEliminarItem = async (itemId) => {
        try {
            await eliminarItemCarrito(itemId);
            obtenerDatosCarrito();
        } catch (error) {
            console.error("Error al eliminar el item del carrito:", error);
        }
    }

    const handleRealizarPago = () => {
        alert("Pago realizado con exito");
        navigator("/");
    };

    const columnas = [
        {
            title: "Producto",
            dataIndex: "producto",
            key: "producto",
            render: (_, record) => record.producto.nombre,
        },
        {
            title: "Cantidad",
            dataIndex: "cantidad",
            key: "cantidad",
            render: (_, record) => (
                <InputNumber
                    defaultValue={record.cantidad}
                    min={1}
                    max={record.producto.stock}
                />
            )
        },
        {
            title: "Precio",
            dataIndex: "precio",
            key: "precio",
            render: (_, record) => `$${record.producto.precio}`,
        },
         {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (_, record) => `$${record.cantidad * record.producto.precio}`,
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleEliminarItem(record.id)}
                >
                    Eliminar
                </Button>
            ),
        }
    ];

    return (
        <>
            <NavbarWithDrawer />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Carrito de compras
                </Typography>
                {loading ? (
                    <p>Cargando carrito...</p>
                ) : (
                    <Table columns={columnas} dataSource={carrito} />
                )}

                <Typography variant="h6" gutterBottom>
                    Total: $
                    {carrito.reduce((total, item) => total + item.cantidad * item.producto.precio, 0)}
                </Typography>

                <Button variant="contained" color="primary"
                onClick={() => handleRealizarPago(carrito.id)}
                >
                    Pagar
                </Button>
            </Box>
        </>
    );
};

export default Carrito;
