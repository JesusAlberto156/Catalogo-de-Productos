import { Router } from 'express';
import config from '../../config/config';

import InventarioRoutes from './inventario.route';
import ProductosRoutes from './productos.route';
import VentasRoutes from './ventas.route';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;

  app.use(api, router);

  router.use('/inventario', InventarioRoutes);
  router.use('/productos', ProductosRoutes);
  router.use('/ventas', VentasRoutes);

  return router;
};

module.exports = routerAPI;