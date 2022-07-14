const http = require('http');
// 서버기능을 호출한다


const hostname = '127.0.0.1';
const port = 3000;
//서버의 기본주소 및 포트를 설정한다


// const 함수명 = () => {}

const server = http.createServer((req, res) => {
  res.statusCode = 200;//응답코드 200번이 정상
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello index.html');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});