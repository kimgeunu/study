const express = require('express');
const bodyParser = require('body-parser');
//npm i mongodb
const mongodbClient = require('mongodb').MongoClient;


const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
let database;


//mongoDB에 연결
function connectDB(){
    const databaseUrl = 'mongodb://localhost:27017';    
    mongodbClient.connect(databaseUrl,(err,db)=>{
        if (!err) {
            const tempdb = db.db('frontenddb');
            database = tempdb;
            console.log('mongodb 데이터 베이스 연결 성공');
        } else {
            console.log(err);
        }
    });
}
//postman 사용
//회원가입
//http://localhost:3000/member/regist
router.route('/member/regist').post((req,res)=>{
    console.log('회원가입 페이지 접속');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;
    console.log(`userid : ${userid},userpw : ${userpw}, username : ${username}, age : ${age}`);

    if (database) {//데이터베이스에 연결 성공시 응답내용
        joinMember(database, userid, userpw, username, age, (err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result.insertedCount>0){//insertedCount발생
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
//http://localhost:3000/member/login
router.route('/member/login').post((req,res)=>{
    console.log('로그인 페이지 접속');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    
    console.log(`userid : ${userid},userpw : ${userpw}`);

    if (database) {//데이터베이스에 연결 성공시 응답내용
        loginMember(database, userid, userpw, (err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result){//로그인 성공시
                    console.dir(result);
                    const resultUserid = result[0].userid;
                    const resultUserPw = result[0].userpw;
                    const resultUserName = result[0].username;
                    const resultUserAge = result[0].age;



                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write(`<p>${resultUserid}(${resultUserName})님 로그인이 성공적으로 완료되었습니다.</p>`);
                    res.write(`<p>나이 : ${resultUserAge})살.</p>`);
                    res.end();
                }else{//로그인 실패
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                    res.end();
                }
            }else{//콜백 함수 연결 실패시
                res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
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


//정보 수정
//http://localhost:3000/member/edit
router.route('/member/edit').post((req,res)=>{
    console.log('정보수정 페이지 접속')
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;
    console.log(`userid : ${userid},userpw : ${userpw}, username : ${username}, age : ${age}`);

    if (database) {//데이터베이스에 연결 성공시 응답내용
        editMember(database, userid, userpw, username, age, (err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result.modifiedCount>0){//발생
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>정보수정 성공</h2>');
                    res.write('<p>정보가 성공적으로 수정되었습니다.</p>');
                    res.end();
                }else{//실패
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>정보수정 실패</h2>');
                    res.write('<p>정보수정이 실패하였습니다.</p>');
                    res.end();
                }
            } else {//콜백 함수 연결 실패시
                res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                res.write('<h2>정보수정 실패</h2>');
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



})

//삭제
//http://localhost:3000/member/delete
router.route('/member/delete').post((req,res)=>{
    console.log('정보삭제 페이지 접속')
    const userid = req.body.userid;
    console.log(`userid : ${userid}`);
    if (database) {//데이터베이스에 연결 성공시 응답내용
        deleteMember(database, userid, (err,result)=>{
            if (!err) {//콜백함수 연결 성공시
                if(result.deletedCount>0){//발생
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>정보삭제 성공</h2>');
                    res.write('<p>정보삭제가 성공적으로 수정되었습니다.</p>');
                    res.end();
                }else{//실패
                    res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                    res.write('<h2>정보삭제 실패</h2>');
                    res.write('<p>정보삭제가 실패하였습니다.</p>');
                    res.end();
                }
            } else {//콜백 함수 연결 실패시
                res.writeHead('200',{'content-type':'text-html;charset=utf-8'});
                res.write('<h2>삭제 실패</h2>');
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




})













//--------------------------------------------------------------------------------------------------------
const joinMember = function(database, userid, userpw, username, age, callback){
    console.log('joinMember호출....');
    const members = database.collection('member');//컬렉션 연결
    members.insertMany([{userid : userid,userpw : userpw, username:username, age : age}],(err,result)=>{
        if (!err) {
            //추가된 객체를 표시하는 메세지 알림을 설정
            if (result.insertedCount) {
                console.log(`사용자 document ${result.insertedCount}명 추가되었음`)
            } else {
                console.log(`사용자 document 추가되지 않음`);
            }
            callback(null,result);
        } else {
            callback(err,null);
            console.log(err);
        }
    });


};

const loginMember = function(database, userid, userpw, callback){
    console.log('loginMember 호출');
    const members = database.collection('member');
    members.find({userid:userid, userpw:userpw}).toArray((err,result)=>{
        if (!err) {
            if (result.length > 0) {//조회된 갯수가 1이상일때
                console.log('사용자를 확인하였습니다.')
                callback(null,result);    
            } else {
                console.log('사용자를 확인하지 못했습니다.');
                callback(null,null);
                
            }
            return;
        } else {
            console.log(err);
            callback(err,null);
        }
    });

}

const editMember = function(database, userid, userpw, username, age, callback){
    console.log('editMember호출....');
    const members = database.collection('member');//컬렉션 연결
    members.updateOne({userid:userid},{$set:{userid:userid,userpw:userpw,username:username,age:age}},(err,result)=>{
        if (!err) {
            if (result.modifiedCount>0) {
                console.log(`사용자 document ${result.modifiedCount}명 수정됨`)
            } else {
                console.log(`사용자 document 수정되지 않음`);
            }
            callback(null,result);
        } else {
            callback(err,null);
            console.log(err);
        }
    });


};

const deleteMember = function(database, userid, callback){
    console.log('deleteMember호출....');
    const members = database.collection('member');//컬렉션 연결
    members.deleteOne({userid:userid},(err,result)=>{
        if (!err) {//삭제시 메세지를 설정 하는 조건문.
            if (result.deletedCount>0) {
                console.log(`사용자 document ${result.deleteCount}명 삭제됨`)
            } else {
                console.log(`사용자 document 삭제되지 않음`);
            }
            callback(null,result);
        } else {
            callback(err,null);
            console.log(err);
        }
    });


};

app.use("/",router);
app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중`)
    connectDB();
})