const http = require('http');
const fs = require('fs');

const server = http.createServer((req , res) => {
    //console.log(req.url  , req.headers ,  req.method);

    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>');
        res.write('<head><title>First Page</title></head>');
        res.write('<body> <form action="/message" method="POST"> <input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('<html>');
   
        res.end();
        return ;
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            body.push(chunk);
        })
        return req.on('end', () => {
            const message = Buffer.concat(body).toString().split('=')[1];
            fs.writeFile('Message.txt' , message , (err) => {
                res.statusCode = 302;
                res.setHeader('Location' , '/');
                res.end();
                return;
            });
        })   
    }

});

server.listen(3000);