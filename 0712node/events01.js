const events = require('events');

//이벤트에 관련된 메소드를 사용할수있는 EventEmitter객체
const eventEmitter = new events.EventEmitter();

//이벤트가 발생했을때 실행할  함수 선언
const connectHandler = function connected(){
    console.log('연결성공');
    eventEmitter.emit('data_received');//새로운 이벤트를 지정(생성)
}

//이벤트와 핸들러와 연결
eventEmitter.on('connection', connectHandler)//지정한 이벤트의 리스너를 추가

//두번째 지정된 이벤트가 발생시 실행될 익명함수와 연결
eventEmitter.on('data_received', ()=>{
    console.log('데이터 수신');
})

eventEmitter.emit('connection');//지정한 이벤트를 발생(생성)