const http = require('http');
const fs = require('fs');

//http.메소드();
http.createServer((req,res) => {
    fs.readFile('test.html',(err,data)=>{
        //예외처리
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-type':'text/html'});
            res.end(data);      
        }
    })
}).listen(3000,()=>{
    console.log('서버 실행중....');
});

//http://127.0.0.1:3000/
