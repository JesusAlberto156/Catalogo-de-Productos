import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Inicio from "../pages/Inicio";
import Productos from '../pages/Productos'
import Inventario from "../pages/Inventario";
import Ventas from "../pages/Ventas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "/inicio",
        element: <Inicio/>,
      },
      {
        path: "/productos",
        element: <Productos/>,
      },
      {
        path: "/inventario",
        element: <Inventario/>,
      },
      {
          path: "/ventas",
          element: <Ventas/>,
      }
    ], 
  },
]);
  
  export default router;