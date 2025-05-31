const http = require('http');
const hostname = '127.0.0.1'; 
const port = 3000; 
const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    if(req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            users: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' }
            ]
        }));
        return;
    }
	res.statusCode = 200;
 	res.setHeader('Content-Type', 'text/json');
 	res.end(JSON.stringify({
        message: 'Hello World2',
    }));
});
 
server.listen(port, hostname, () => { 
       console.log(`Server running at http://${hostname}:${port}/`);
}); 
