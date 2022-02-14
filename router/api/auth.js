import AuthController from '../../app/controllers/api/auth-controller.js';

export default {
  group: {
    prefix: '/auth',
  },
  routes: [
    {
      method: 'post',
      path: '/login',
      handler: AuthController.login,
    },
    {
      method: 'post',
      path: '/register',
      handler: AuthController.register,
    },
    {
      method: 'post',
      path: '/forgetPassword',
      handler: AuthController.forgetPassword,
    },
    {
      method: 'patch',
      path: '/resetPassword/:token',
      handler: AuthController.resetPassword,
    },
  ],
};
