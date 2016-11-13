// server-side code
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((req, res) => {
  fs.createReadStream(path.resolve('app/server/view/index.html'))
  .pipe(res);
});

server.listen(3000);
