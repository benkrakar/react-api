import AppException from '../exceptions/AppException.js';

const authrization = (...role) =>
  function (req, res, next) {
    if (!role.includes(req.user.role)) {
      return next(
        new AppException('You dont have permission to access this action!', 403)
      );
    }
    next();
  };
export default authrization;
