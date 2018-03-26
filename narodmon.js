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

            var sd = '#' + config["mac"] + '#' + config["name"] + '\n'
            config["devices"].forEach(el => {
                var v = g.deviceList[el.ip].value()
                el.forEach(fut => {
                    // sd.append('')
                    sd += '#'
                    sd += el.name
                    sd += '-'
                    sd += fut
                    sd += '#'
                    sd += v[fut]
                    sd += '\n'
                })
            });
            sd += '##'
            console.log('[narodmon] ', sd)
            var client = new net.Socket();
            client.connect(1337, '127.0.0.1', function () {
                console.log('Connected');
                client.write(sd);
            });
            client.on('data', function (data) {
                console.log('Received: ' + data);
                client.destroy(); // kill client after server's response
            });
            client.on('close', function () {
                console.log('Connection closed');
            });
        }
    })
}

sednData()
setInterval(sendData(), 480 * 1000)