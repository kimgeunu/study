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
            if(!err){
                
                res.writeHead(200,{'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });
    
}