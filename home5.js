var global = require('./global.js');

var mqtt = require('mqtt')
global.client = mqtt.connect('mqtt://192.168.0.31')

/*
  Поиск - /dev/search/req
  Ответ - /dev/search/answer
    {ip, type}
  Значение -  /dev/<ip>/value
*/

global.client.on('connect', function () {
  global.client.subscribe('/dev/search/answer')
  global.client.publish('/dev/search/req', '{"ip":"192.168.0.31", "version":"5"}')
})

global.client.on('message', function (topic, message) {
  // message is Buffer
  // console.log()
  message = message.toString()
  console.log("[mqtt]", "topic", topic)
  console.log("[mqtt]", "mes", message)
  global.netEvent.emit(topic, message)

})
var Metio = require('./devices/Metio').Metio;
var Olen = require('./devices/Olen').Olen;


global.netEvent.on('/dev/search/answer', function (mes) {
  mes = JSON.parse(mes)
  console.log("[home5][answer]", 
   mes["type"]
  )
  console.log("[home5][answer]", 
    mes["ip"]
  )
  switch (mes["type"]) {
    case "metio":
      global.deviceList[mes["ip"]] = new Metio(mes["ip"])
      // client.subscribe('/dev/search/answer')
      break;
    case "olen":
      global.deviceList[mes["ip"]] = new Olen(mes["ip"])
      // client.subscribe('/dev/search/answer')
      break;
  
    default:
      break;
  }

})