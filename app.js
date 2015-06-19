var UNIVERSE = 0;

var LED_PIN = 3;


var artnetsrv = require('artnet-node/lib/artnet_server');


var mraa = require('mraa');
var pin = new mraa.Pwm(LED_PIN);
pin.enable(false);
pin.write(0);



var srv = artnetsrv.listen(6454, function(msg, peer) {
	console.log("-----------------");
	console.log("Sequence: " + msg.sequence);
	console.log("Physical: " + msg.physical);
	console.log("Universe: " + msg.universe);
	console.log("Length: " + msg.length);
	console.log("Data: " + msg.data);
	console.log("-----------------");


	if (msg.universe == UNIVERSE && msg.length > 0) {
		if (msg.data[0] == 0) {
			pin.enable(false);
		} else {
			pin.enable(true);
			pin.write(msg.data[0]/255);
		}
		
	}

});




