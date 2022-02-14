import UserAuth from '../../app/controllers/api/userAuth-controller.js';
import auth from '../../app/middlewares/authentification.js';
import uploadUserImage from '../../app/middlewares/imgsUpload.js';

export default {
  group: {
    prefix: '/me',
    middlewares: [auth()],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      handler: UserAuth.getMe,
    },
    {
      method: 'patch',
      path: '/updatePassword',
      handler: UserAuth.updatePassword,
    },
    {
      method: 'patch',
      path: '/',
      middlewares: [
        uploadUserImage.image('user'),
        uploadUserImage.resize,
      ],
      handler: UserAuth.updateMe,
    },
    {
      method: 'delete',
      path: '/',
      handler: UserAuth.deleteMe,
    },
  ],
};
