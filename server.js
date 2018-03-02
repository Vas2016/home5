// var app = require('express')();
// import path from "path";
var path = require('path');
// var app = express()
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

console.log(__dirname)

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('data', function (data) {
    console.log(data);
  });
});
// const io = require('socket.io')(app, {
//   path: '/test',
//   serveClient: false,
//   // below are engine.IO options
//   pingInterval: 10000,
//   pingTimeout: 5000,
//   cookie: false
// });

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})





server.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
