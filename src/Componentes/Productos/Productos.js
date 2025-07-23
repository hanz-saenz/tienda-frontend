import React, { useEffect, useState } from "react";
import NavbarWithDrawer from "../Dashboard/NavbarWithDrawer";
import { Box, Typography } from "@mui/material";
import { Table, Space, Button } from "antd";
import { listarProductos, listarCategorias, listarMarcas, listarProveedores, eliminarProducto } from "../../Servicios/Productos/productosServicio";
import CrearDrawer from "./CrearDrawer";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [productoEditar , setProductoEditar] = useState(null);

  const abrirDrawerCreacion = () => {
    setProductoEditar(null);
    setOpenDrawer(true);
  };
  const abrirDrawerEdicion = (producto) => {
    console.log('producto editar ',producto);
    setProductoEditar(producto);
    setOpenDrawer(true);
  };

  const eliminar = async (id) => {
    try {

      const value = window.confirm("Estas seguro de eliminar el producto?");
      if (!value) {
        return;
      }
      await eliminarProducto(id);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    const obtenerProductos = async () => {
      setLoading(true);
      try {
        const response = await listarProductos();
        setProductos(response.data);
        const responseCategorias = await listarCategorias();
        setCategorias(responseCategorias.data);

        const responseMarcas = await listarMarcas();
        setMarcas(responseMarcas.data);

        const responseProveedores = await listarProveedores();
        setProveedores(responseProveedores.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  // Definir columnas de la tabla
  const columnas = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      render: (precio) => `$${precio}`,
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => abrirDrawerEdicion(record)}>Editar</Button>
          <Button danger onClick={() => eliminar(record.id)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <NavbarWithDrawer />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a la sección de Productos
        </Typography>
        <Button type="primary" variant="contained" onClick={abrirDrawerCreacion}>
                Crear Producto
              </Button>
        <Table
          columns={columnas}
          dataSource={productos}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Box>

      <CrearDrawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setProductoEditar(null);
        }}
        setProductos={setProductos}
        categorias={categorias}
        marcas={marcas}
        proveedores={proveedores}
        productoEditar={productoEditar}
      />
    </>
  );
};

export default Productos;
