require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {})

var g = require('./g.js')
var ips = require('./utils/getLocalIP.js').getIP()
console.log(ips)
g.ip = ips[0]["ip"]
console.log(require('./utils/getCPU.js').getCPUs())
require('./server.js')
require('./home5.js')
require('./narodmon.js')