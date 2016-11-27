import {Console} from 'console';
import fs = require('fs');
import path = require('path');

const [stdoutStream, errorStream] = ['stdout', 'error']
.map(name => {
  return fs.createWriteStream(path.resolve(`log/${name}.log`));
});

const logger = new Console(stdoutStream, errorStream);

export default logger;
