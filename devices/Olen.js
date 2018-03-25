var global = require('../global.js')
var Device = require('./Device.js')

class Olen extends Device {
    constructor(_ip){
        super()
        this.ip = _ip
        console.log(this.ip)
        global.client.subscribe("/dev/" + this.ip + "/value")
        var t = this;
        function fun(params) {
            t.valueHandle(params)
        }
        global.netEvent.on("/dev/" + this.ip + "/value", fun)

        // global.netEvent.on("/dev/" + ip + "/value", value)
    }
    valueHandle(msg) {
        msg = JSON.parse(msg)
        this.temp = msg["temp"]
        this.humid = msg["humid"]
        this.light = msg["light"]
        this.pochva = msg["pochva"]
        console.log("[DEVICE]", this)
    }
    get value (){    
        return { temp:this.temp, humid:this.humid, light:this.light, pochva:this.pochva }
    }
    polive(){
        global.client.publish("/dev/" + this.ip + "/value", '{"polive" : true}')
    }
}

module.exports.Olen = Olen