import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { format } = winston;
const { combine, timestamp, prettyPrint, errors } = format;

const transport = new DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs',
});

const logger = winston.createLogger({
  format: combine(
    errors({ stacks: true }),
    timestamp(),
    prettyPrint(),
    format.json()
  ),
  json: true,
  transports: [transport],
});

export default logger;
