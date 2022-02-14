import UsersController from '../../app/controllers/api/users-controller.js';
import auth from '../../app/middlewares/authentification.js';
import authrization from '../../app/middlewares/authorization.js';


export default {
  group: {
    prefix: '/users',
    middlewares: [auth(), authrization('admin')],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: UsersController.getAll,
    },
    {
      method: 'post',
      path: '/',
      handler: UsersController.create,
    },
    {
      method: 'get',
      path: '/:id',
      handler: UsersController.getOne,
    },
    {
      method: 'patch',
      path: '/:id',
     
      handler: UsersController.update,
    },
    {
      method: 'delete',
      path: '/',
      handler: UsersController.delete,
    },
  ],
};
