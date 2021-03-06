// var app = require('express')();
// import path from "path";
var path = require('path');
// var app = express()
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var g = require('./g.js')
var fs = require('fs')
var narodmonConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/narodmon.c.json')))

console.log(__dirname)

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('getList', function (data) {
    var list = []
    console.log(g.deviceList)
    // t.forEach(element => {
      
    // });
    for (var key in g.deviceList) {
      
        var element = g.deviceList[key];
        list.push(element.data)
        //console.log(element.data)
      
    }
    console.log(list)
    socket.emit('list', list);
  });
  socket.on('action', function (data) {
    g.webEvent.emit(data.action, data.params)
  });
  socket.on('getConfig', function (data) {
    if (data.name == 'narodmon'){
      socket.emit('config_narodmon', {config:narodmonConfig})
    }
    
  });
  socket.on('setConfig', function (data) {
    console.log('CONFIGCONFIG!!!!!sfdsafklsdmfklamsdklfamsdklfmkasldfmalksdmfalksdmflkasdm')
    if (data.name == 'narodmon'){
      narodmonConfig = data.config
      fs.writeFile(path.join(__dirname, 'config/narodmon.c.json'), JSON.stringify(narodmonConfig), (err) =>{
        console.error(err)
      })
    }
    
  });
  socket.on('getSigList', function (data) {
    var list = []
    console.log(g.deviceList)
    // t.forEach(element => {
      
    // });
    for (var key in g.deviceList) {
      
        var element = g.deviceList[key];
        list.push({ip:element.data.ip, sig:element.sig})
        //console.log(element.data)
      
    }
    console.log(list)
    socket.emit('sigList', list);
  });
  socket.on('data', function (data) {
    // data = JSON.parse(data)
    switch (data.mesType) {
      case 'getValue':
        socket.emit(data.ip, g.deviceList[data.ip].value())
        break;
      case 'setValue':
        g.deviceList[data.ip].setValue(data)
        //socket.emit(data.ip, g.deviceList[data.ip])
        break;
      default:
        break;
    }
  });
});

g.webEvent.on('/web/value', (d)=>{
  io.local.emit(d.ip, d)
})
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

app.get('/allDevice', function (req, res) {
  var ans = {}
  // var w = []
  // w.length
  ans.count =  g.deviceList.length
  ans.deviceList = g.deviceList
  res.send(JSON.stringify(ans))
})




server.listen(8081, function () {
  console.log('Example app listening on port 8080!')
})