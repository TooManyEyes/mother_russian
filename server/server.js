const  http = require('http');
const server = http.createServer()

const html=

server.on('request',(req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    switch (req.url){
        case '/':
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html);

        case '/app.css':
            res.writeHead(200,{'Content-Type':'text/css'});
            res.end(css);

        case '/app.js':
            res.writeHead(200,{'Content-Type':'text/javascript'})
            res.end(js);

        default:
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end('404 не найдено');

    }

});
server.listen(3000,()=> console.log('работает'))
