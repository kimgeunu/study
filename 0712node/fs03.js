const fs = require('fs');//파일을 다루는 모듈

//비동기 처리는 예외 처리를 할 필요가 없습니다.if문으로 예외처리한다.
fs.readFile('text1.txt','utf-8', (err, data)=>{//비동기
    //예외처리
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음 : ${data}`)
    }

})

//동기식은 예외처리를 위해서는 try문을 사용해야한다.
try {
    const text = fs.readFileSync('text1.txt','utf-8');//동기식
    console.log(`동기식으로 읽음 : ${text}`);
} catch (error) {
    console.log('에러발생 ! / 동기');
}console.log('프로그램 종료');