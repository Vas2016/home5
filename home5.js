var g = require('./g.js');

var mqtt = require('mqtt')
g.client = mqtt.connect('mqtt://192.168.0.31')

/*
  Поиск - /dev/search/req
  Ответ - /dev/search/answer
    {ip, type}
  Значение -  /dev/<ip>/value
*/

g.client.on('connect', function () {
  g.client.subscribe('/dev/search/answer')
  g.client.publish('/dev/search/req', '{"ip":"192.168.0.31", "version":"5"}')
})

g.client.on('message', function (topic, message) {
  // message is Buffer
  // console.log()
  message = message.toString()
  console.log("[mqtt]", "topic", topic)
  console.log("[mqtt]", "mes", message)
  g.netEvent.emit(topic, message)

})
var Metio = require('./devices/Metio.js').Metio;
var Olen = require('./devices/Olen.js').Olen;
var Monitor = require('./devices/Monitor.js').Monitor;

g.netEvent.on('/dev/search/answer', function (mes) {
  mes = JSON.parse(mes)
  console.log("[home5][answer]", 
   mes["type"]
  )
  console.log("[home5][answer]", 
    mes["ip"]
  )
  switch (mes["type"]) {
    case "metio":
      g.deviceList[mes["ip"]] = new Metio(mes["ip"])
      // client.subscribe('/dev/search/answer')
      break;
    case "olen":
      g.deviceList[mes["ip"]] = new Olen(mes["ip"])
      // client.subscribe('/dev/search/answer')
      break;
    case "monitor":
      g.deviceList[mes["ip"]] = new Monitor(mes["ip"])
      // client.subscribe('/dev/search/answer')
      break;
  
    default:
      break;
  }

})