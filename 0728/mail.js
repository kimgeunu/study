const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { formatWithOptions } = require('util');
//npm i nodemailer



const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));



router.route('/mail').get((req, res)=>{

    console.log('/mail 호출..');
    fs.readFile('mail.html','utf-8',(err,data)=>{
        if (!err) {
            res.writeHead('200',{'content-type':'text/html'})
            res.end(data);
        } else {
            console.log(err)
        }


    })
})


router.route('/mailOk').post((req,res)=>{
    const from = req.body.from;
    const formmail = req.body.formmail;
    const to = req.body.to;
    const tomail = req.body.tomail;
    const title = req.body.title;
    const content = req.body.content;

    const fmtfrom = `${from}<${formmail}>`;
    const fmtto = `${to}<${tomail}>`;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'ohohmashoe@gmail.com',
            pass: 'fbmbvjpkwrsdvtic'
        },
        host: 'smtp.mail.com',
        port: '465'
    });
    const mailOptions = {
        from : fmtfrom,
        to : fmtto,
        subject : title,
        text: content
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        transporter.close();
        if (!err) {
            console.log(info);
        } else {
            console.log(err);
        }
    });

})
app.use("/",router);

app.all('*',(req,res)=>{
    res.status(404).send('<h2>페이지를 찾을수 없습니다. </h2>')
})

app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중`)
    
})