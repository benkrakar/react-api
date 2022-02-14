import models from '../../models/index.js';
import AppException from '../../exceptions/AppException.js';
import AuthService from '../../services/auth-service.js';
import filterObj from '../../helpers/filtreUserData.js';

class UserAuth {
  async getMe(req, res, next) {
    const user = await models.users.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      date: { user },
    });
  }

  async updateMe(req, res, next) {
    if (req.body.password)
      return next(
        new AppException('you cant change your password with this route', 400)
      );

    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.user_image = req.file.filename;
    const updatedUser = await models.users.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  }

  async deleteMe(req, res, next) {
    await models.users.findByIdAndUpdate(req.user.id, { active: false });
    res.status(200).json({
      status: 'success',
      date: null,
    });
  }

  async updatePassword(req, res, next) {
    const user = await models.users.findById(req.user.id).select('+password');
    if (!user) return next(new AppException('User not found', 400));
    user.password = req.body.password;
    user.passwordChangedAt = Date.now() - 1000;
    await user.save();
    const payload = { id: user.id };
    const token = await AuthService.generateToken(payload);
    res.status(200).json({
      token,
    });
  }
}

export default new UserAuth();
