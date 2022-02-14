import models from '../../models/index.js';
import BaseController from '../../../core/controller/index.js';

class ReservationController extends BaseController {
  constructor() {
    super(models.reviews);
  }
}

export default new ReservationController();
