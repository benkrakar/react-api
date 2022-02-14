import mailConfig from '../../../config/mail.js';
import Mail from '../../modules/mail/index.js';
import models from '../../models/index.js';
import AppException from '../../exceptions/AppException.js';
import AuthService from '../../services/auth-service.js';
import FilterData from '../../helpers/filtreUserData.js';

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await models.users.findOne({ email }).select('+password');
    if (!user) return next(new AppException('invalid mail', 403));

    if (!(await AuthService.isPasswordMatch(password, user.password)))
      return next(new AppException('incorrect password', 403));
    //to not send password with data
    user.password = undefined;

    const payload = { id: user.id, email: user.email, name: user.name };
    const token = await AuthService.generateToken(payload);

    const cookieOptions = AuthService.SendCookies();

    res.cookie('jwt', token, cookieOptions);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  }

  async register(req, res) {
    const filtredBody = FilterData(req.body, 'name', 'email', 'password');
    const newUser = await models.users.create(filtredBody);

    newUser.password = undefined;

    const payload = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    const token = await AuthService.generateToken(payload);

    const cookieOptions = AuthService.SendCookies();
    res.cookie('jwt', token, cookieOptions);

    res.status(202).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  }

  async forgetPassword(req, res, next) {
    const user = await models.users.findOne({ email: req.body.email });
    if (!user) return next(new AppException('No user with this email', 403));
    const resetToken = await AuthService.generatePasswordResetToken();

    user.passwordResetToken = await AuthService.hashPasswordResetToken(
      resetToken
    );

    user.passwordResetExpires = await AuthService.ResetExpiresToken();

    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/resetPassword/${resetToken}`;

    const userinfo = await models.users
      .findOne({ email: req.body.email })
      .lean();

    await Mail.send('reset-password', (message) => {
      message
        .from(mailConfig.form)
        .to(user.email)
        .subject('Reset Password')
        .with({
          userinfo,
          resetURL,
        });
    });

    res.status(200).send('Email sent successfully');
  }

  async resetPassword(req, res, next) {
    const hashedToken = await AuthService.hashPasswordResetToken(
      req.params.token
    );
    const user = await models.users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
      return next(new AppException('Token is invalid or expired', 403));
    user.password = req.body.password;
    user.passwordChangedAt = Date.now() - 1000;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const payload = { id: user.id };
    const token = await AuthService.generateToken(payload);
    res.status(200).json({
      token,
    });
  }
}

export default new AuthController();
