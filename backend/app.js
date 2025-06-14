const http = require("http");

function RequestHandler(req,res){
      const url = req.url;
      console.log(req.url);
      if(url=== '/'){
            
      }

}
const server = http.createServer(  RequestHandler );

server.listen(2212);