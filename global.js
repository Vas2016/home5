const EventEmitter = require('events')

class GlobalEvents extends EventEmitter {}
var event = new GlobalEvents()
var netEvent = new GlobalEvents()

var deviceList = {}
var client = {}

module.exports.event = event
module.exports.netEvent = netEvent
module.exports.deviceList = deviceList
module.exports.client = client