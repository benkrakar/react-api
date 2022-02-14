import RoomsController from '../../app/controllers/api/rooms-controller.js';
import auth from '../../app/middlewares/authentification.js';
import uploadRoomImage from '../../app/middlewares/imgsUpload.js';

export default {
  group: {
    prefix: '/rooms',
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: RoomsController.getAll,
    },
    {
      method: 'post',
      path: '/',
      middlewares: [auth()],
      handler: RoomsController.create,
    },
    {
      method: 'get',
      path: '/:id',
      handler: RoomsController.getOne,
    },
    {
      method: 'patch',
      path: '/:id',
      middlewares: [
        auth(),
        uploadRoomImage.images('room'),
        uploadRoomImage.resize,
      ],
      handler: RoomsController.update,
    },
    {
      method: 'delete',
      middlewares: [auth()],
      path: '/:id',
      handler: RoomsController.delete,
    },

   
  ],
};
