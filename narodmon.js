var fs = require('fs')
var net = require('net');
var g = require('./g.js')
var config = JSON.parse(fs.readFileSync('./config/narodmon.c.json'))
console.log('[narodmon] config', config)

function sendData() {
    // config = JSON.parse(fs.readFileSync('./config/narodmon.c.json'))
    console.log('[narodmon]', 'send data')
    fs.readFile('./config/narodmon.c.json', function (err, data) {
        if (err) {
            console.error('[narodmon] err', err)
        }
        else {
            config = JSON.parse(data)
            var qwerty = false
            var sd = '#' + config["mac"] + '#' + config["name"] + '\n'
            for (let i = 0; i < config["devices"].length; i++) {
                const el = config["devices"][i];
                if (g.deviceList[el.ip] != null) {
                    qwerty = true
                    var v = g.deviceList[el.ip].value()
                    for (let j = 0; j < el["value"].length; j++) {
                        const fut = el["value"][j];
                        // sd.append('')
                        sd += '#'
                        sd += el.name
                        sd += '-'
                        sd += fut
                        sd += '#'
                        sd += v[fut]
                        sd += '\n'
                    }

                }
            }
            sd += '##'
            if (qwerty == true) {
                console.log('[narodmon] ', sd)
                var client = new net.Socket()
                client.connect(8283, 'narodmon.ru', function () {
                    console.log('[narodmon] Connected')
                    client.write(sd)
                });
                client.on('data', function (data) {
                    console.log('Received: ' + data)
                    client.destroy()
                });
                client.on('close', function () {
                    console.log('Connection closed')
                })
            }
        }
    })
}
setTimeout(() => {
    console.log('started')

    sendData()
    setInterval(sendData, 480 * 1000)
}, 40000)