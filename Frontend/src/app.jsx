import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/SideBar';

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';

import { useState } from 'react';

export default function App() {
  
  const [activeView, setActiveView] = useState('Inicio');
  const switchView = (view) => setActiveView(view);

  //INVENTARIO//
  // Añadir estado y funciones para Inventario
const [inventarios, setInventarios] = useState([
  {
    IdInventario: 'I-CDP-0001',
    IdProducto: 'P-CDP-0001',
    Cantidad: 10,
    Fecha: '10/12/2024',
  },
  {
    IdInventario: 'I-CDP-0002',
    IdProducto: 'P-CDP-0002',
    Cantidad: 5,
    Fecha: '11/12/2024',
  },
]);

const [inventarioID, setInventarioID] = useState(inventarios.length + 1);

const addInventario = (newItem) => {
  const newId = 'I-CDP-${inventarioID.toString().padStart(4, "0")}';
  setInventarios([...inventarios, { ...newItem, IdInventario: newId }]);
  setInventarioID(inventarioID + 1);
};

const editInventario = (updatedItem) => {
  setInventarios(inventarios.map((item) =>
    item.IdInventario === updatedItem.IdInventario ? updatedItem : item
  ));
};

const deleteInventario = (id) => {
  setInventarios(inventarios.filter((item) => item.IdInventario !== id));
};
//INVENTARIO//
  
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
                      Inventarios={inventarios}
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
                      ID={inventarioID}
                      productos={productos}
                      inventarios={inventarios}
                      addInventario={addInventario}
                      editInventario={editInventario}
                      deleteInventario={deleteInventario}
                    />
                  ):(
                    <></>
                  )}
                  {activeView === 'Ventas' ? (
                    <Ventas 
                      ID={ventaID}
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