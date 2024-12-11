import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/SideBar';

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';
import Cuenta from './pages/Cuenta';

import { useState } from 'react';

export default function App() {
  
  const [activeView, setActiveView] = useState('Inicio');
  const switchView = (view) => setActiveView(view);
  
  //PRODUCTOS
  const initialProducts = [
    { id: "P-CDP-0001", nombre: "Guitarra Acústica Yamaha", precio: "200", urlImagen: "https://example.com/guitarra.jpg" },
    { id: "P-CDP-0002", nombre: "Teclado Casio CTK-3500", precio: "150", urlImagen: "https://example.com/teclado.jpg" },
    { id: "P-CDP-0003", nombre: "Batería Pearl Export Series", precio: "800", urlImagen: "https://example.com/bateria.jpg" },
    { id: "P-CDP-0004", nombre: "Bajo Eléctrico Fender", precio: "600", urlImagen: "https://example.com/bajo.jpg" },
    { id: "P-CDP-0005", nombre: "Amplificador Marshall 15W", precio: "120", urlImagen: "https://example.com/amplificador.jpg" },
  ];
  const [productos, setProductos] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  //Funcion para agregar un producto
  const onAddProduct = (newProduct) => {
    // Generar el nuevo ID_Producto basado en la longitud actual de productos
    const newId = `P-CDP-${(productos.length + 1).toString().padStart(4, "0")}`;
    
    // Agregar el ID_Producto generado al nuevo producto
    const updatedProduct = { ...newProduct, id: newId };

    // Actualizar la lista de productos
    const updatedProducts = [...productos, updatedProduct];
    setProductos(updatedProducts); 
    setFilteredProducts(updatedProducts);
  }
  // Función para editar un producto
  const onEditProduct = (updatedProduct) => {
    const updatedProducts = productos.map((producto) =>
      producto.id === updatedProduct.id ? updatedProduct : producto
    );
    setProductos(updatedProducts);
    setFilteredProducts(updatedProducts);
  };
  // Función para eliminar un producto
  const onDeleteProduct = (id) => {
    const updatedProducts = productos.filter((producto) => producto.id !== id);
    setProductos(updatedProducts);
    setFilteredProducts(updatedProducts);
  };
  //PRODUCTOS


  //VENTAS
  const [ventas,setVentas] = useState([
    {
      IdVenta: 'CDP-0001',
      TipoDePago: 'Tarjeta',
      Fecha: '09/12/2024',
      Hora: '09:41',
      Productos: [
        {
          IdProducto: 'P-CDP-0001',
          Nombre: 'Guitarra Acústica Yamaha',
          Cantidad: '2',
          PrecioUnitario: 200
        },{
          IdProducto: 'P-CDP-0004',
          Nombre: 'Bajo Eléctrico Fender',
          Cantidad: '1',
          PrecioUnitario: 600
        }
      ],
      MontoTotal: 1000
    },
    {
      IdVenta: 'CDP-0002',
      TipoDePago: 'Efectivo',
      Fecha: '09/12/2024',
      Hora: '11:27',
      Productos: [
        {
          IdProducto: 'P-CDP-0010',
          Nombre: 'Cinturón para guitarra',
          Cantidad: '1',
          PrecioUnitario: 20
        },{
          IdProducto: 'P-CDP-0009',
          Nombre: 'Guitarra Eléctrica Fender Stratocaster',
          Cantidad: '1',
          PrecioUnitario: 750
        }
      ],
      MontoTotal: 770
    },
    {
      IdVenta: 'CDP-0003',
      TipoDePago: 'Efectivo',
      Fecha: '09/12/2024',
      Hora: '15:27',
      Productos: [
        {
          IdProducto: 'P-CDP-0010',
          Nombre: 'Cinturón para guitarra',
          Cantidad: '10',
          PrecioUnitario: 20
        }
      ],
      MontoTotal: 200
    },
    {
      IdVenta: 'CDP-0004',
      TipoDePago: 'Efectivo',
      Fecha: '10/12/2024',
      Hora: '13:35',
      Productos: [
        {
          IdProducto: 'P-CDP-0005',
          Nombre: 'Amplificador Marshall 15W',
          Cantidad: '2',
          PrecioUnitario: 120
        },{
          IdProducto: 'P-CDP-0006',
          Nombre: 'Micrófono Shure SM58',
          Cantidad: '1',
          PrecioUnitario: 100
        }
      ],
      MontoTotal: 340
    }
  ]);

  const addVenta = (newVenta) =>
    setVentas([...ventas,{...newVenta}]);
  const editVenta = (updatedVenta) => 
    setVentas(ventas.map((venta) => 
      (venta.IdVenta === updatedVenta.IdVenta ? updatedVenta : venta)));
  const deleteVenta = (Id) => {
    setVentas(ventas.filter((venta) => venta.IdVenta !== Id));
  };
  //VENTAS
  
  return(
    <div>
        <div id="app-container">
            <Sidebar onSwitchView={switchView}/>
            <div id="content">
                <div id="main-content">
                  {activeView === 'Inicio' ? (
                    <Inicio
                      Productos={productos}
                      Ventas={ventas}
                    />
                  ):(
                    <></>
                  )}
                  {activeView === 'Productos' ? (
                    <Productos
                      initialProducts={productos}
                      onAddProduct={onAddProduct}
                      onEditProduct={onEditProduct}
                      onDeleteProduct={onDeleteProduct}
                      filteredProducts={filteredProducts}
                      setFilteredProducts={setFilteredProducts}
                    />
                  ):(
                    <></>
                  )}
                  {activeView === 'Inventario' ? (
                    <Inventario
                      Productos={productos}
                    />
                  ):(
                    <></>
                  )}
                  {activeView === 'Ventas' ? (
                    <Ventas 
                      productos={productos}
                      ventas={ventas} 
                      addVenta={addVenta}
                      editVenta={editVenta}
                      deleteVenta={deleteVenta}
                    />
                  ):(
                    <></>
                  )}
                  {activeView === 'Cuenta' ? (
                    <Cuenta/>
                  ):(
                    <></>
                  )}
                </div>
            </div>
            <Footer />
        </div>
    </div>
  );
};