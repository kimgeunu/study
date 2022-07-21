module.exports = (app,fs)=>{// 모듈화

    //127.0.0.1:3000
    app.get('/',(req,res)=>{
        res.render('index.ejs',{
            length:10
        });
    });

    //127.0.0.1:3000/about
    app.get('/about',(req,res)=>{
        res.render('about.html');
    });

    //127.0.0.1:3000/list
    app.get('/list',(req,res)=>{
        fs.readFile(__dirname + "/../data/member.json","utf-8",(err,data)=>{
            //      현재디렉토리+불러올 파일 주소 , utf-8, 예외 처리
            if(!err){
                
                res.writeHead(200,{'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });
    //127.0.0.1:3000/getMember/apple    //조회
    app.get('/getMember/:userid',(req,res)=>{
        fs.readFile(__dirname+'/../data/member.json','utf-8',(err,data)=>{
            if(!err){
                const member = JSON.parse(data);
                //json형식으로 불러오기 이렇게 하지않을시 글자형으로 가지고 오게됨
                res.json(member[req.params.userid]);
                
            }else{
                console.log(err);
            }
        })
    })

    //127.0.0.1:3000/joinMember/apple   //추가
    app.post('/joinMember/:userid',(req,res)=>{
        const result = {}; //실제로 데이터의 입력요소가 수정되는건 상관없음
        const userid = req.params.userid;

        if(!req.body["password"]|| !req.body["name"]){
            result['success'] = 100;
            result['msg'] = "매개 변수가 전달되지 않음";
            res.json(result);
            return false;
        }

        //아이디 중복 검사
        fs.readFile(__dirname+'/../data/member.json','utf-8',(err,data)=>{
            const member = JSON.parse(data);
            
            if(member[userid]){
                result["success"] = 101;        //중복 표시 101
                result["msg"] = "중복된 아이디";        //중복된 아이디를 지정
                res.json(result);
                return false;       //더이상 진행을 할수없게 호출된 위치로 이동( 그냥 진행하지마라 라는 뜻.)
            }
            console.log(req.body);

            member[userid]=req.body;
            fs.writeFile(__dirname+'/../data/member.json',JSON.stringify(member,null,'\t'),'utf-8',(err,data)=>{
                                                            // stringify(json 문자열을 보내준다.)
                if(!err){
                    result['success'] =200;
                    result['msg'] = '성공';
                    res.json(result);
                }else{
                    console.log(err);
                }
            }); 
        })
    })
    //회원정보 수정
    //127.0.0.1:3000/updateMember/apple   //수정
    app.put('/updateMember/:userid',(req,res)=>{
        const result = {};
        const userid = req.params.userid;

        if(!req.body["password"]|| !req.body["name"]){
            result['success'] = 100;
            result['msg'] = "매개 변수가 전달되지 않음";
            res.json(result);
            return false;
        }

        fs.readFile(__dirname+'/../data/member.json','utf-8',(err,data)=>{            
            if(!err){
                const member = JSON.parse(data);
                member[userid]=req.body;
                fs.writeFile(__dirname+'/../data/member.json',JSON.stringify(member,null,'\t'),'utf-8',(err,data)=>{
                    if(!err){
                        result['success'] =200;
                        result['msg'] = '성공';
                        res.json(result);
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log(err);
            }
        })
    })
    //회원정보 삭제
    //127.0.0.1:3000/deleteMember/apple   //삭제  //delect는 완전 삭제 patch는 덮어씌우기
    app.delete('/deleteMember/:userid',(req,res)=>{
        const result ={};
        fs.readFile(__dirname+'/../data/member.json','utf-8',(err,data)=>{            
            const member = JSON.parse(data);
            if(!member[req.params.userid]){//데이터가 없을 경우
                result['success'] = 102;
                result['msg'] = "사용자를 찾을 수 없음";
                res.json(result);
                return false;
            }
            delete member[req.params.userid];//데이터 삭제
            fs.writeFile(__dirname+'/../data/member.json',JSON.stringify(member,null,'\t'),'utf-8',(err,data)=>{
                result['success'] =200;
                result['msg'] = '성공';
                res.json(result);
            })
        })

    })
}