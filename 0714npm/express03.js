const express = require('express');
const app = express();
const port = 3000;

//127.0.0.1:3000
//localhost:3000

app.use((req,res)=>{
    console.log('첫번째 미들웨어(함수) 실행');
    res.redirect('http://www.naver.com');
    
});






app.listen(port,()=>{
    console.log(`${port} 포트로 실행중`);
});
