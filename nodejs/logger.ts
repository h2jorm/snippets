import {Console} from 'console';
import fs = require('fs');
import path = require('path');

const [stdoutStream, errorStream] = ['stdout', 'error']
.map(name => {
  return fs.createWriteStream(path.resolve(`log/${name}.log`), {
    flags: 'a',
  });
});

class Logger extends Console {
  prefix(message: string) {
    return `[${new Date().toISOString()}] ${message}`;
  }

  log(message: string) {
    super.log(this.prefix(message));
  }

  error(message: string) {
    super.log(this.prefix(message));
  }
}

const logger = new Logger(stdoutStream, errorStream);

export default logger;
