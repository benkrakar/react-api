import models from '../../models/index.js';
import BaseController from '../../../core/controller/index.js';

class UsersController extends BaseController {
  constructor() {
    super(models.users);
  }
}

export default new UsersController();
