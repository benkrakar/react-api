import bcrypt from 'bcryptjs';
import Tokenizer from '../modules/tokenizer/index.js';

class AuthService {
  async isPasswordMatch(password, original) {
    return await await bcrypt.compare(password, original);
  }

  async changedPasswordAfter(passwordChangedAt, iat) {
    const ChangedAt = parseInt(passwordChangedAt.getTime() / 1000, 10);
    return iat < ChangedAt;
  }

  async generateToken(payload) {
    return {
      accessToken: Tokenizer.generateAccessToken(payload),
    };
  }

  async generatePasswordResetToken() {
    return Tokenizer.generateRandomToken();
  }

  async hashPasswordResetToken(resetToken) {
    return Tokenizer.generateHashedToken(resetToken);
  }

  async ResetExpiresToken() {
    return Date.now() + 10 * 60 * 1000;
  }

  SendCookies() {
    const cookieOptions = {
      exprires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.MODE_ENV === 'production') {
      cookieOptions.secure = true;
    }
    return cookieOptions;
  }
}
export default new AuthService();
