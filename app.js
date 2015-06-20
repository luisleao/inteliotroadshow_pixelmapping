var UNIVERSE_ATUADORES = 0;
var UNIVERSE_ENDERECAVEL = 1;

var LED_PIN = 3;
var MINIMO = 210;


var artnetsrv = require('artnet-node/lib/artnet_server');


var mraa = require('mraa');


var pinLed = new mraa.Pwm(3);
	pinLed.enable(false);
	pinLed.write(0);

/*

var pinGiro = new mraa.Gpio(5); //setup digital read on pin 5
	pinGiro.dir(mraa.DIR_OUT); //set the gpio direction to output
	pinGiro.write(0); //set the digital pin to low (0)

var pinEl = new mraa.Gpio(6); //setup digital read on pin 5
	pinEl.dir(mraa.DIR_OUT); //set the gpio direction to output
	pinEl.write(0); //set the digital pin to low (0)

var pinVentilador = new mraa.Gpio(7); //setup digital read on pin 5
	pinVentilador.dir(mraa.DIR_OUT); //set the gpio direction to output
	pinVentilador.write(0); //set the digital pin to low (0)


*/

var srv = artnetsrv.listen(6454, function(msg, peer) {
	/*
	console.log("-----------------");
	console.log("Sequence: " + msg.sequence);
	console.log("Physical: " + msg.physical);
	console.log("Universe: " + msg.universe);
	console.log("Length: " + msg.length);
	console.log("Data: " + msg.data);
	console.log("-----------------");
	*/


	//console.log("ENTRADA ", msg.data[0], msg.data[0]/255);

	if (msg.universe == UNIVERSE_ATUADORES && msg.length > 0) {


		//LED
		if (msg.data[0] == 0) {
			pinLed.write(0);
			pinLed.enable(false);
		} else {
			pinLed.enable(true);
			pinLed.write(msg.data[0]/255);
		}

		//GIRO

		//pinGiro.write(msg.data[1] >= MINIMO ? 1 : 0);
		//pinEl.write(msg.data[2] >= MINIMO ? 1 : 0);
		//pinVentilador.write(msg.data[3] >= MINIMO ? 1 : 0);


		console.log(msg.data[0]/255, Math.round(msg.data[1]/255), Math.round(msg.data[2]/255), Math.round(msg.data[3]/255));



	}









});




