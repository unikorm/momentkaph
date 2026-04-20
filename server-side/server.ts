import {createServer} from 'node:https';

createServer((req, res) => {
    res.writeHead(418);
    res.end();
}).listen(8008)