const express = require('express');
const bodyParser = require('body-parser');
    //post 데이터를 전달 받기 위해 사용 npm i body-parser

const app = express();
const port = 3000;

//127.0.0.1:3000
//localhost:3000
app.use( bodyParser.urlencoded({extended:false}));

app.use((req,res)=>{
    const userid = req.body.userid;//body
    //const userid = req.query.userid;//get
    const userpw = req.body.userpw;

    console.log(`userid : ${userid}, userpw : ${userpw}`)

    //화면출력
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.write('<h2>post로 받아온 user정보</h2>');
    res.write(`<p>userid = ${userid}</p>`);
    res.write(`<p>userpw = ${userpw}</p>`);
    res.end();


});






app.listen(port,()=>{
    console.log(`${port} 포트로 실행중`);
});
