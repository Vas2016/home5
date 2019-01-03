require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {})

var g = require('./g.js')
var ips = require('./utils/getLocalIP.js').getIP()
console.log(ips)
g.ip = ips[0]["ip"]
g.ip = '192.168.0.113'
// console.log(require('./utils/getCPU.js').getCPUs())
require('./server.js')
//var Olen = require('./devices/Olen.js').Olen;

//g.deviceList['192.168.0.5'] = new Olen('192.168.0.5')

require('./home5.js')
// require('./narodmon.js')