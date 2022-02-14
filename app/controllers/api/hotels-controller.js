import models from '../../models/index.js';
import BaseController from '../../../core/controller/index.js';

class HotelsController extends BaseController {
  constructor() {
    super(models.hotels, "rooms");
  }
}

export default new HotelsController();
