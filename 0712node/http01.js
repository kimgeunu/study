const http = require('http');

//http.메소드();
http.createServer((req,res) => {
    res.writeHead(200,{'content-type':'text/html'});
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>http 모듈 테스트</title>
            <style>
                *{
                    background-color: aqua;
                }
            </style>
        </head>
        <body>
            <h1>http 모듈 테스트</h1>
            <p>처음으로 실행하는 node.js http서버</p>
        </body>
        </html>
    `);
}).listen(3000,()=>{
    console.log('서버 실행중....');
});

//http://127.0.0.1:3000/
