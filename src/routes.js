import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js';
import OrderControler from './app/controllers/OrderControler.js';

const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware, uploads.single('file'), ProductController.store);
routes.get('/products', ProductController.index)


routes.put('/products/:id', adminMiddleware, uploads.single('file'), ProductController.update);
routes.get('/products', ProductController.index)

routes.post('/categories', adminMiddleware, uploads.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, uploads.single('file'), CategoryController.update);

routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderControler.store);
routes.get('/orders', OrderControler.index);
routes.put('/orders/:id', adminMiddleware, OrderControler.update);


export default routes;
