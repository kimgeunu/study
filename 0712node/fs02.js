const fs = require('fs');//파일을 다루는 모듈

const data = "hello node.js 105150000!!";

fs.writeFile('text2.txt', data, 'utf-8',(err)=>{
    if(err){
        console.log('에러발생'+err);
    }else{
        console.log('작성완료 / 비동기');
    }
})

fs.writeFileSync('text3.txt',data,'utf-8');
console.log('저장완료/동기')