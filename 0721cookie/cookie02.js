const express = require('express');
const cookieParser = require('cookie-parser');
//npm i cookie-parser

const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('!@#$%^&*()'));//app안에 cookie-parser의 기능을 포함한다.  //(!@#$%^&*())으로 인하여 암호화가 된다.

//쿠키설정
//127.0.0.1:3000/login
app.get('/login',(req,res)=>{
    fs.readFile('login.html','utf-8',(err,data)=>{
        if(!err){
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }else{
            console.log(err);
        }
    })
})

//logout

app.listen(port,()=>{
    console.log(`${port}포트로 서버 가동중`)
})
