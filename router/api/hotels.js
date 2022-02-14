import HotelsController from '../../app/controllers/api/hotels-controller.js';
import authrization from '../../app/middlewares/authorization.js';
import auth from '../../app/middlewares/authentification.js';

export default {
  group: {
    prefix: '/hotels',
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: HotelsController.getAll,
    },
    {
      method: 'post',
      path: '/',
      middlewares: [auth(), authrization('admin')],
      handler: HotelsController.create,
    },
    {
      method: 'get',
      path: '/:id',
      handler: HotelsController.getOne,
    },
    {
      method: 'patch',
      path: '/:id',
      middlewares: [auth(), authrization('admin')],
      handler: HotelsController.update,
    },
    {
      method: 'delete',
      middlewares: [auth(), authrization('admin')],
      path: '/:id',
      handler: HotelsController.delete,
    },
  ],
};
