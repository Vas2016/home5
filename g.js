const EventEmitter = require('events')

class GlobalEvents extends EventEmitter {}
var event = new GlobalEvents()
var netEvent = new GlobalEvents()
var webEvent = new GlobalEvents()

var deviceList = {}
var client = {}
var ip = '192.168.0.31'

module.exports.event = event
module.exports.netEvent = netEvent
module.exports.webEvent = webEvent
module.exports.deviceList = deviceList
module.exports.client = client
module.exports.ip = ip