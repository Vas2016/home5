var dgram = require('dgram');

function searchModulesNet(ip) {
    var message = new Buffer(JSON.stringify({mesType:"search", ip:ip, version:5}));
    var client = dgram.createSocket('udp4');
    //client.setBroadcast(true);
    //client.setMulticastLoopback(true);

    var client2 = dgram.createSocket('udp4');
    //client2.setBroadcast(true);
    //client2.setMulticastLoopback(true);

    // search ESP8266 modules
    client.send(message, 0, message.length, 3234, '239.255.255.50', function(err){
        console.log(err)
        client.close();
    });

    // search Arduino modules
    client2.send(message, 0, message.length, 3235, '239.255.255.51', function(err) {
        console.log(err)
        client2.close();
    });
}

exports.searchModulesNet = searchModulesNet;