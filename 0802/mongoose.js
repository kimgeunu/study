const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');


const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

//데이터베이스 연결
let database;
let UserSchema;
let UserModel;

function connectDB(){
    const url = 'mongodb://localhost:27017/frontenddb';
    console.log('데이터베이스 연결 시도중 ... ');
    mongoose.Promise = global.Promise;//몽구스의 프로미스 객체를 global.Promise 객체로 사용
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    database = mongoose.connection;//데이터베이스 연결 구간
    //데이터베이스의 연결상태에 대한 예외처리 설정
    database.on('error', console.error.bind(console, 'mongoose 연결실패'));
    database.on('open', () => {
        console.log('데이터베이스 연결 성공');
        //스키마설정
        UserSchema = mongoose.Schema({
            userid: String,
            userpw: String,
            username: String,
            gender: String
        });
        console.log('UserSchema 생성완료!');
        UserSchema.this.static('findAll', function (callback) {
            return this.find({}, callback);
        })
        UserModel = mongoose.model('user', UserSchema);//테이블명 users로설정
        console.log('UserModel이 정의되었습니다!');
    })

}
//회원가입
//http://localhost:3000/user/regist
router.route('/user/regist').post((req,res)=>{
    console.log('회원가입 페이지 접속');
    
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const gender = req.body.gender;
    console.log(`userid : ${userid},userpw : ${userpw}, username : ${username}, gender : ${gender}`);

    if (database) {//데이터베이스에 연결 성공시 응답내용
        loginUser(database, userid, userpw, username, gender, (err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result){//insertedCount발생
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    res.end();
                }else{//insertedCount 발생 실패
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>가입이 실패하였습니다.</p>');
                    res.end();
                }
            } else {//콜백 함수 연결 실패시
                res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류가 발생하였습니다.</p>');
                res.end();
            }
        });
        
    } else {//데이터 베이스에 연결 실패시 응답내용
        res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결을 실패하였습니다.</p>');
        res.end();
    }

});


//로그인
//http://localhost:3000/user/login
router.route('/user/login').post((req,res)=>{
    console.log('로그인 페이지 접속');
    
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid : ${userid},userpw : ${userpw}`);

    if (database) {//데이터베이스에 연결 성공시 응답내용
        joinUser(database, userid, userpw,(err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result){//insertedCount발생
                    console.log(result);
                    const username = result[0].username;
                    const gender = result[0].gender;
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write('<p>로그인이 성공적으로 완료되었습니다.</p>');
                    res.end();
                }else{//insertedCount 발생 실패
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>로그인이 실패하였습니다.</p>');
                    res.end();
                }
            } else {//콜백 함수 연결 실패시
                res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>오류가 발생하였습니다.</p>');
                res.end();
            }
        });
        
    } else {//데이터 베이스에 연결 실패시 응답내용
        res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결을 실패하였습니다.</p>');
        res.end();
    }

});

//리스트
//http://localhost:3000/user/list
router.route('/user/list').get((req,res)=>{
    console.log('리스트 페이지 접속');
    if (database) {//데이터베이스에 연결 성공시 응답내용
        UserModel.findAll((err,result)=>{
            if (!err) {
                if (result) {
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>회원리스트</h2>');
                    res.write(`<div><ul>`);
                    for(let i=0;result.lenght;i++){
                        const userid = result[i].userid;
                        const username = result[i].username;
                        const gender = result[i].gender;
                        res.write(`<li>${i} : ${userid} / ${username} / ${gender} </li>`);
                    }
                    res.write(`</ul></div>`);
                    res.end();
                } else {
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>회원정보 없음</h2>');
                    res.write('<p>회원정보가 없습니다.</p>');
                    res.end();
                }
            } else {
                console.log('리스트 조회실패')
            }
        });

    } else {//데이터 베이스에 연결 실패시 응답내용
        res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결을 실패하였습니다.</p>');
        res.end();
    }

});

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const joinUser = function(database, userid,userpw,username,gender,callback){
    console.log('joinUser 호출...')
    const users = new UserModel({userid:userid,userpw:userpw,username:username,gender:gender})
    users.save((err,result)=>{
        if(!err){
            console.log(`${result}추가완료`)
            callback(null,result);
            return;
        }else{
            callback(err,null);
        }
    })
}
const loginUser = function(database, userid,userpw,callback){
    console.log('joinUser 호출...')
    UserModel.find({userid:userid,userpw:userpw},(err,result)=>{
        if (!err) {
            if(result.lenght>0){
                console.log(`로그인완료`);
                callback(null,result);
            }else{
                callback(null,null);
            }
        } else {
            callback(err,null);
        }
    })
    
}






app.use("/",router);

app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중`)
    connectDB();
})