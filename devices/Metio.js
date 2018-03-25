var g = require('../g.js')
var Device = require('./Device.js')

class Metio extends Device {
    constructor(_ip){
        super()
        this.ip = _ip
        console.log(this.ip)
        g.client.subscribe("/dev/" + this.ip + "/value")
        var t = this
        function fun(params) {
            t.valueHandle(params)
        }
        function fun2(params) {
            t.webHandle(params)
        }
        g.netEvent.on("/dev/" + this.ip + "/value", fun)
        g.webEvent.on("/web/" + this.ip, fun2)
        // g.netEvent.on("/dev/" + ip + "/value", value)
    }
    valueHandle(msg) {
        msg = JSON.parse(msg)
        this.temp = msg["temp"]
        this.humid = msg["humid"]
        console.log("[DEVICE]", this)
    }
    webHandle(){

    }
    value (){    
        return { temp:this.temp, humid:this.humid }
    }
    setValue (){    
        return { temp:this.temp, humid:this.humid }
    }
}

module.exports.Metio = Metio