import RoomsController from '../../app/controllers/api/rooms-controller.js';
import auth from '../../app/middlewares/authentification.js';
import uploadProductImage from '../../app/middlewares/imgsUpload.js';

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
        uploadProductImage.images('product'),
        uploadProductImage.resize,
      ],
      handler: RoomsController.update,
    },
    {
      method: 'delete',
      middlewares: [auth()],
      path: '/:id',
      handler: RoomsController.delete,
    },

    //*implementing nested routes for reviews
    // {
    //   method: 'post',
    //   middlewares: [auth],
    //   path: '/:productId/reviews',
    //   handler: ReviewsController.createReview,
    // },
    // {
    //   method: 'get',
    //   middlewares: [auth],
    //   path: '/:productId/reviews',
    //   handler: ReviewsController.getReviews,
    // },
  ],
};
