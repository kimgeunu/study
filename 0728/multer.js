const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');// npm i multer
const static = require('serve-static');// npm i serve-static
//특정폴더를 요청에 의해서 직접 파일에 접근할 수 있도록 기능을 제공하는 익스프레스 미들웨어.

const path = require('path');//url(주소)를 컨트롤 하는 모듈
const logger = require('morgan');//npm i morgan

//로그를 관리하기 위한 라이브러리 모듈
//특정사이트에 접속했을때마다 정보(접속시간등등)확인하는 모듈

const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
//특정폴더를 경로로 설정
app.use('/public',static(path.join(__dirname, 'public')));
app.use('/uploads',static(path.join(__dirname, 'uploads')));
app.use(logger('dev'));//dev, short, common, bombined

//multer 객체 설정
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads')
    },
    filename:(req, file, callback)=>{
        const extension = path.extname(file.originalname);//원래 파일명
        const basename =path.basename(file.originalname, extension);// 파일명만 추출 apple
        callback(null,basename+"_"+Date.now()+extension);

    }
})

const upload = multer({
    storage :  storage,//deskStorage 설정 객체
    limit:{
        file:1,//파일업로드 갯수
        fileSize : 1024 * 1024 * 100 //파일 전송량 100메가
    }
})


//라우터 객체 설정
router.route('/write').post(upload.array('photo',1),(req, res)=>{
    console.log('/write 호출..');
    try {
        
    const title = req.body.title;
    const content = req.body.content;
    const files = req.body.files;
    console.dir(req.files[0])
    const orginalname = files[0].originalname;
    const filename = files[0].filename;
    const mimetype = files[0].mimetype;
    const size = files[0].size;
    
    console.log(`파일 정보 : 원본 파일 명 ${originalname}, 파일이름 ${filename} , mumetype ${mimetype}, 파일크기 ${size}`);
    //파일업로드 결과 처리
    res.writeHead(200,{'content-type':'text/html;charset:utf-8'});
    res.write('<h2>파일업로드 성공<h2>');
    res.write('<hr>')
    res.write(`<p>제목 : ${title}</p>`);
    res.write(`<p>내용 : ${content}</p>`);
    res.write(`<p>원본파일명 : ${originalname}</p>`);
    res.write(`<p>파일명 : ${filename}</p>`);
    res.write(`<p>mimetype : ${mimetype}</p>`);
    res.write(`<p>파일크기 : ${size}</p>`);
    res.write(`<p><img src='/uploads/${filename}' width='200'></p>`);
    res.end();
        
    } catch (e) {
        console.log(e)
    }
})






app.use("/",router);

app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중`)

})