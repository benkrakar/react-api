import ReservationController from '../../app/controllers/api/reservations-controller.js';
import auth from '../../app/middlewares/authentification.js';
import authrization from '../../app/middlewares/authorization.js';

export default {
  group: {
    prefix: '/reservations',
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: ReservationController.getAll,
    },
    {
      method: 'post',
      path: '/',
      middlewares: [auth(true), authrization('admin', 'user')],
      handler: ReservationController.create,
    },
    {
      method: 'get',
      path: '/:id',
      handler: ReservationController.getOne,
    },
    {
      method: 'patch',
      path: '/:id',
      middlewares: [auth(), authrization('admin', 'user')],
      handler: ReservationController.update,
    },
    {
      method: 'delete',
      middlewares: [auth(), authrization('admin', 'user')],
      path: '/:id',
      handler: ReservationController.delete,
    },
  ],
};
