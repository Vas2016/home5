var os = require('os');

function getIP() {
    var ifaces = os.networkInterfaces();
    var ips = []
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                ips.push({ifname:ifname, ip:iface.address, mac:iface.mac})
                // console.log('get ip', ifname, iface.address);
            }
            ++alias;
        });
    });
    return ips
}

module.exports.getIP = getIP