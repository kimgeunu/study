const express = require('express');
const bodyParser = require('body-parser');
    //post 데이터를 전달 받기 위해 사용 npm i body-parser

const app = express();
const port = 3000;

//라우터 객체 선언
const router = express.Router();


//127.0.0.1:3000
//localhost:3000
app.use( bodyParser.urlencoded({extended:false}));

//router.route(경로생성)
//127.0.0.1:3000/member/login
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출');
});


//127.0.0.1:3000/member/regist
router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 호출');
});

//127.0.0.1:3000/member/about
router.route('/member/about').get((req,res)=>{
    console.log('/member/about 호출');
});


//예외처리
app.use('/',router);
//에러 발생시
app.all('*',(req,res)=>{
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
});





app.listen(port,()=>{
    console.log(`${port} 포트로 실행중`);
});
