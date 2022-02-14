import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import mailConfig from '../../../config/mail.js';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig.smtp);
    this._setCompiler();
  }

  _setCompiler() {
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          defaultLayout: false,
        },
        viewPath: 'views/emails/',
        extName: '.hbs',
      })
    );
  }

  send(message) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(message, (error, res) => {
        if (error) {
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
}
export default Mail;
