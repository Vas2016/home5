var g = require('../g.js')
var Device = require('./Device.js')

class Metio extends Device {
    constructor(_ip){
        super()
        this.ip = _ip
        this.type = "Metio"
        console.log(this.ip)
        g.client.subscribe("/dev/" + this.ip + "/value")
        var t = this
        g.netEvent.on("/dev/" + this.ip + "/value", (params)=>{t.valueHandle(params)})
        g.webEvent.on("/web/" + this.ip, (params)=>{t.webHandle(params)})
        this.data = {}
        this.data.ip = this.ip
        this.data.type = this.type
        // g.netEvent.on("/dev/" + ip + "/value", value)
    }
    valueHandle(msg) {
        msg = JSON.parse(msg)
        this.data.temp = msg["temp"]
        this.data.humid = msg["humid"]
        g.webEvent.emit("/web/value", this.data)
        console.log("[DEVICE]", this)
    }
    webHandle(){

    }
    value (){    
        return this.data
    }
    setValue (d){    
        // return { temp:this.data.temp, humid:this.data.humid,  press:this.data.press }
    }
}

module.exports.Metio = Metio