const http = require('http');

const server = http.createServer((req , res) => {
    console.log(req.url  , req.headers ,  req.method);

    res.setHeader('Content-Type' , 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><h1>Welcome to my server! </h1></body>');
    res.end();
    
});

server.listen(3000);