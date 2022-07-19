const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

const router = express.Router();

//파일 읽기 ( 없으면 오류 뜸.)
const header = fs.readFileSync('./header.ejs','utf-8');
const body = fs.readFileSync('./body.ejs','utf-8');

//127.0.0.1:3000/about
router.route('/about').post((req,res)=>{
    const html = ejs.render(
        header,{
            title:'매게변수로 전달된 제목',
            content:ejs.render(
                body,{
                    message:'매개변수로 전달된 텍스트 메세지입니다.'
                }
            )
        }
    );

    res.writeHead(200,{'content-type':'text/html'});
    res.end(html);
    
})

//router 예외 처리
app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h2>페이지를 찾을수 없습니다.</h2>')
})



app.listen(port,()=>{
    console.log(`${port}포트로 서버 구동중`);
})


