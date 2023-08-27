/*페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto*/
/*  */
// setting server
const express = require("express");
const app = express();
const fs = require('fs');

let broadcaster;
const port = 9000;
const path = require('path');
var cors = require('cors');

// const http = require("http");
// const server = http.createServer(options, app);

const https = require("https");
const options = {
  key: fs.readFileSync('cert-files/key.pem'),
  cert: fs.readFileSync('cert-files/cert.pem'),
  // ca: fs.readFileSync('C:/Windows/System32/server.csr'),
};
const server = https.createServer(options, app);

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const io = require("socket.io")(server);
app.use(cors())
app.use(express.static(__dirname + "/public")); // load files below /public
app.use(express.static(__dirname + '/node_modules'));
app.use(express.json());

app.get('/broadcast', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/broadcast.html'));
});

app.get('/main', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/main.html'));
});

//list창으로 이미지 띄우기
let imageUrlList1 = [];
let imageUrlList2 = [];
let imageUrlList3 = [];
let imageUrlList4 = [];
app.get('/ImageUrl1', (req, res)=>{
  console.log('GET /ImageUrl1');
  res.send(imageUrlList1);
});

app.post('/ImageUrl1', (req, res)=>{
  console.log(req.body);
  imageUrlList1 = req.body.imgUrlList;
  res.send("ok");
});

app.get('/ImageUrl2', (req, res)=>{
  console.log('GET /ImageUrl2');
  res.send(imageUrlList2);
});

app.post('/ImageUrl2', (req, res)=>{
  console.log(req.body);
  imageUrlList2 = req.body.imgUrlList;
  res.send("ok");
});

app.get('/ImageUrl3', (req, res)=>{
  console.log('GET /ImageUrl3');
  res.send(imageUrlList3);
});

app.post('/ImageUrl3', (req, res)=>{
  console.log(req.body);
  imageUrlList3 = req.body.imgUrlList;
  res.send("ok");
});

app.get('/ImageUrl4', (req, res)=>{
  console.log('GET /ImageUrl4');
  res.send(imageUrlList4);
});

app.post('/ImageUrl4', (req, res)=>{
  console.log(req.body);
  imageUrlList4 = req.body.imgUrlList;
  res.send("ok");
});

//----------------
let imageUrlList0 = [];
app.get('/ImageUrl0', (req, res)=>{
  console.log('GET /ImageUrl0');
  res.send(imageUrlList0);
});

app.post('/ImageUrl0', (req, res)=>{
  console.log(req.body);
  imageUrlList0 = req.body.imgUrlList;
  res.send("ok");
});
//----------------



io.sockets.on("error", e => console.log(e));
io.sockets.on("connection", socket => {
  console.log("a");
  socket.on("broadcaster", () => {
    broadcaster = socket.id; // set the broadcaster
    socket.broadcast.emit("broadcaster"); // to all id
    console.log("b");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
    console.log("c");
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
    console.log("d");
  });


  // initiate webrtc
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
    console.log("e");
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
    console.log("f");
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
    console.log("g");
  });
});


server.listen(port, () => console.log(`Server is running on port ${port}\nBroadcasting page -> https://10.50.8.200:9000/broadcast\nUser interface -> https://10.50.8.200:9000/main`));

// commit 예제 test