import Mail from './smtp.js';
import Message from './message.js';

class Sender {
  constructor() {
    this.mail = new Mail();
  }

  async send(view, cb) {
    const message = new Message();
    cb(message);
    message.data['template'] = view;
    return await this.mail.send(message.parse());
  }
}

export default new Sender();
