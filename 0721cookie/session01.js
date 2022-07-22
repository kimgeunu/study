const express = require('express');
//npm i express-session
const expressSession = require('express-session');

const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({
    secret:'!@#$%^&*()',
    resave:false,
    saveUninitialized:true
}));

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

app.post('/loginOk',(req,res)=>{
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    
    //admin/1234
    if(userid=='admin' && userpw=='1234'){//아이디가 어드민이고 비밀번호가 1234일시
        req.session.member={
            id:userid,
            pw:userpw,
            isauth:true//인증 되었다.

        }//세션
        res.redirect('/main');//로그인 성공시 메세지가 보이는 창으로 이동
    }else{
        res.redirect('/fail');//로그인 실패시 이동할 페이지
    }


})

//로그인 성공시 이동하는 라우트
app.get('/main',(req,res)=>{
    

    if(req.session.member){
        console.log(req.session.member);
        fs.readFile('main.html','utf-8',(err,data)=>{
            if(!err){
                res.writeHead(200, {'content-type':'text/html'});
                res.end(data);
                console.log('로그인성공');
            }else{
                res.redirect('/login');
                
            }
        }) 
    }
})

//로그인 실패시 이동하는 라우트

app.get('/fail',(req,res)=>{

    fs.readFile('fail.html','utf-8',(err,data)=>{
        if(!err){
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
            console.log('로그인실패');
        }else{
            
        }
    })
})

//로그인이 된 후 로그아웃으로 이동
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        console.log('세션삭제')
    });
    res.redirect('/login');
    console.log('로그아웃');
})

app.listen(port,()=>{
    console.log(`${port}포트로 서버 가동중`)
})
