var g = require('../g.js')
var Device = require('./Device.js')

class Olen extends Device {
    constructor(_ip){
        super()
        this.ip = _ip
        this.type = "Olen"
        console.log(this.ip)
        g.client.subscribe("/dev/" + this.ip + "/value")
        var t = this;
        function fun(params) {
            t.valueHandle(params)
        }
        g.netEvent.on("/dev/" + this.ip + "/value", fun)
        function fun2(params) {
            t.polive()
        }
        g.webEvent.on("/web/" + this.ip + "/polive", fun2)
        this.data = {}
        this.data.ip = this.ip
        this.data.type = this.type
        // g.netEvent.on("/dev/" + ip + "/value", value)
    }
    valueHandle(msg) {
        msg = JSON.parse(msg)
        this.data.temp = msg["temp"]
        this.data.humid = msg["humid"]
        this.data.light = msg["light"]
        this.data.pochva = msg["pochva"]
        g.webEvent.emit("/web/value", this.data)
        console.log("[DEVICE]", this)
    }
    value (){    
        return this.data
    }
    polive(){
        console.log('polive');
        g.client.publish("/dev/" + this.ip + "/polive", '{"polive" : true}')
    }
}

module.exports.Olen = Olen