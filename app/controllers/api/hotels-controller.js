import models from '../../models/index.js';
import BaseController from '../../../core/controller/index.js';

class HotelsController extends BaseController {
  constructor() {
    super(models.categories, 'rooms');
  }
}

export default new HotelsController();
