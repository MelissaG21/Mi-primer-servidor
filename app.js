const http = require('http');
const fs = require('fs');
//<>
//http => (request, response)

// HTML CSS JS IMG Audio Video
http.createServer((request, response) => {
    const file = request.url == '/'? './www/index.html' : `./www${request.url}`;
    
    if(request.url == '/login'){
        let data = [];
        request.on("data", value =>{
            data.push(value);
        }).on("end", () => {
            let params = Buffer.concat(data).toString();
            console.log(params);
            response.write(params);
            response.end();
        });
    }
    
    fs.readFile(file, (err, data) => {
        if(err){
            response.writeHead(404, {"Content-Type":"text/plain"});
            response.write("Not found");
            response.end();
        }else{
            //hola.como estas.split(".")= {hola, como estas}
            //hola.como estas.split(".").pop()  Nos da el ultimo elemento de un arreglo
            const extension = file.split('.').pop();
            switch(extension){
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    break;
                case 'html':
                    response.writeHead(200, {"Content-Type":"text/html"});
                    break;
                case 'jpeg':
                    response.writeHead(200, {"Content-Type":"image/jpeg"});
                    break;
                case 'css':
                    response.writeHead(200, {"Content-Type":"text/css"});
                    break;
                case 'js':
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    break;
                case 'ico':
                    response.writeHead(200, {"Content-Type":"image/icon"});
                    break;
                default:
                    response.writeHead(200, {"Content-Type":"text/plain"});
            }
            response.write(data);
            response.end();
        }
        
    });
}).listen(4444);