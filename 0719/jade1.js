const express = require('express');
const fs = require('fs');
const jade = require('jade');//npm i jade

const app = express();
const port = 3000;

const router = express.Router();

//127.0.0.1:3000/about
router.route('/about').post((req,res)=>{
    fs.readFile('./jade01.jade','utf-8',(err,data)=>{
        if(!err){
            const jd = jade.compile(data);

            res.writeHead(200,{'content-type':'text/html'});
            res.end(jd()); 
        }else{
            console.log(err);
        }
    });

});

//router 예외 처리
app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h2>페이지를 찾을수 없습니다.</h2>')
})



app.listen(port,()=>{
    console.log(`${port}포트로 서버 구동중`);
})

