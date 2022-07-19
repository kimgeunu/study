const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');


const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
//view 엔진 등록, ejs 파일을 자동으로 html로 변환시킨다. 

app.use(bodyparser.urlencoded({extended:false}));
//url 파싱 qs방식, query-string => 중첩된 객체 표현 허용할지 여부를 체크

const module1 = require('./router/module1')(app,fs);
//express()와 fs()를 전달




app.listen(port,()=>{
    console.log(`${port}포트로 서버 가동중`)
})
