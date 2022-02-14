import models from '../../models/index.js';
import BaseController from '../../../core/controller/index.js';

class RoomsController extends BaseController {
  constructor() {
    super(models.rooms, "reservations");
  }
}

export default new RoomsController();
