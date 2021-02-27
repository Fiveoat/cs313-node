'use strict'
const http = require('http')
const fs = require('fs')


let onRequest = (request, response) => {
    if (request.url == '/') {
        console.log('index');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        fs.createReadStream('index.html').pipe(response)
    }
    else if (request.url == '/home') {
        console.log('home');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.write("<h1>Welcome to the Home Page</h1>");
    } else if (request.url == '/data') {
        console.log('data');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(JSON.stringify({
            "name": "Coty Fivecoat",
            "class": "cs313"
        }));
    } else {
        console.log('404');
        fs.createReadStream('404.html').pipe(response)
        response.writeHead(404, {"Content-Type": "text/html"});
    }
}

const server = http.createServer(onRequest)
const hostname = '127.0.0.1';
const port = 8888;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});