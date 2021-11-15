const { BADQUERY } = require("dns");
var http = require("http");
const { listenerCount } = require("process");
const { stringify } = require("querystring");

http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('Archivo buy\n');




}).listen(8000);

console.log('Servidor en la url http://127.0.0.1:8000/');