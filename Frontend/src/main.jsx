import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path:'/',
    element:<Inicio/>
  },
  {
    path:'/Inicio',
    element:<Inicio/>
  },
  {
    path:'/Productos',
    element:<Productos/>
  },
  {
    path:'/Inventario',
    element:<Inventario/>
  },
  {
    path:'/Ventas',
    element:<Ventas/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
