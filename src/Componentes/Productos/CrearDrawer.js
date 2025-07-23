import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Drawer, Form, Input, InputNumber, Switch, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { crearProducto, actualizarProducto, obtenerDetalleProducto } from "../../Servicios/Productos/productosServicio";

const ProductoDrawer = ({ open, onClose, setProductos, categorias, marcas, proveedores, productoEditar }) => {
  const [form] = Form.useForm();
  const [fileListPrincipal, setFileListPrincipal] = useState([]);
  const [fileListAdicionales, setFileListAdicionales] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    console.log('productoEditar', productoEditar);
    if (productoEditar) {
      // Cargar datos del producto para edición
      obtenerDetalleProducto(productoEditar.id).then((response) => {
        const producto = response.data;
        console.log('productoEditarproductoEditar', producto);
        form.setFieldsValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          activo: producto.activo,
          categorias_ids: producto.categorias.map((cat) => cat.id),
          proveedor_id: producto.proveedor.id,
          marca_id: producto.marca.id,
        });

        // Cargar imágenes existentes
        console.log('Cargar imagenes')
        const principal = producto.imagenes.find((img) => img.es_principal);
        if (principal) {
          setFileListPrincipal([
            {
              uid: principal.id,
              name: principal.imagen.split('/').pop(),
              status: 'done',
              url: `${process.env.REACT_APP_API_URL}${principal.imagen}`,
            },
          ]);
        }

        console.log('Cargar imagenes')
        const adicionales = producto.imagenes.filter((img) => !img.es_principal);
        setFileListAdicionales(
          adicionales.map((img) => ({
            uid: img.id,
            name: img.imagen.split('/').pop(),
            status: 'done',
            url: `${process.env.REACT_APP_API_URL}${img.imagen}`,
          }))
        );
      });
    } else {
      form.resetFields();
      setFileListPrincipal([]);
      setFileListAdicionales([]);
    }
  }, [productoEditar, form]);

  const handlePrincipalChange = ({ fileList }) => {
    setFileListPrincipal(fileList.slice(-1));
  };

  const handleAdicionalesChange = ({ fileList }) => {
    setFileListAdicionales(fileList);
  };

  const handleSubmit = async (values) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('precio', values.precio);
      formData.append('stock', values.stock);
      formData.append('activo', values.activo ? 'true' : 'false');
      formData.append('proveedor_id', values.proveedor_id);
      formData.append('marca_id', values.marca_id);
      values.categorias_ids.forEach((id) => {
        formData.append('categorias_ids', id);
      });

      if (fileListPrincipal.length > 0 && fileListPrincipal[0].originFileObj) {
        formData.append('imagen_principal', fileListPrincipal[0].originFileObj);
      }
      fileListAdicionales.forEach((file) => {
        if (file.originFileObj) {
          formData.append('imagenes_files', file.originFileObj);
        }
      });

      let response;
      if (productoEditar) {
        response = await actualizarProducto(productoEditar.id, formData);
        setProductos((prevProductos) =>
          prevProductos.map((p) => (p.id === productoEditar.id ? response.data : p))
        );
        message.success('Producto actualizado correctamente');
      } else {
        response = await crearProducto(formData);
        setProductos((prevProductos) => [...prevProductos, response.data]);
        message.success('Producto creado correctamente');
      }

      form.resetFields();
      setFileListPrincipal([]);
      setFileListAdicionales([]);
      onClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      message.error(productoEditar ? 'Error al actualizar el producto' : 'Error al crear el producto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Drawer
      title={productoEditar ? "Editar Producto" : "Crear Producto"}
      width={400}
      open={open}
      onClose={onClose}
      footer={
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => form.submit()}
            disabled={uploading}
          >
            {uploading ? 'Guardando...' : productoEditar ? 'Actualizar' : 'Crear'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            style={{ marginLeft: 8 }}
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre del producto' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción del producto"
          rules={[{ required: true, message: 'Por favor ingrese la descripción del producto' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="precio"
          label="Precio del producto"
          rules={[{ required: true, message: 'Por favor ingrese el precio del producto' }]}
        >
          <InputNumber min={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock del producto"
          rules={[{ required: true, message: 'Por favor ingrese el stock del producto' }]}
        >
          <InputNumber min={0} step={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="activo"
          label="Producto Activo"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="categorias_ids"
          label="Categorías del producto"
          rules={[{ required: true, message: 'Seleccione las categorías del producto' }]}
        >
          <Select
            mode="multiple"
            placeholder="Seleccione las categorías del producto"
            style={{ width: '100%' }}
            options={categorias.map((categoria) => ({
              value: categoria.id,
              label: categoria.nombre,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="proveedor_id"
          label="Proveedor del producto"
          rules={[{ required: true, message: 'Seleccione el proveedor del producto' }]}
        >
          <Select
            placeholder="Seleccione el proveedor del producto"
            style={{ width: '100%' }}
            options={proveedores.map((proveedor) => ({
              value: proveedor.id,
              label: proveedor.nombre,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="marca_id"
          label="Marca del producto"
          rules={[{ required: true, message: 'Seleccione la marca del producto' }]}
        >
          <Select
            placeholder="Seleccione la marca del producto"
            style={{ width: '100%' }}
            options={marcas.map((marca) => ({
              value: marca.id,
              label: marca.nombre,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Imagen Principal"
          name="imagen_principal"
        >
          <Upload
            fileList={fileListPrincipal}
            onChange={handlePrincipalChange}
            beforeUpload={() => false}
            accept="image/*"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Seleccionar Imagen Principal</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Imágenes Adicionales"
          name="imagenes_files"
        >
          <Upload
            fileList={fileListAdicionales}
            onChange={handleAdicionalesChange}
            beforeUpload={() => false}
            accept="image/*"
            multiple
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Seleccionar Imágenes Adicionales</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ProductoDrawer;