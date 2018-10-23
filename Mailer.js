
var nodemailer = require("nodemailer");
var sender = "r.zubieta@nextlifesoft.com";

var PASSWORD = ''

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: sender,
       pass: PASSWORD
   }
});

exports.sendMail = function(address, registry, callerNumber){

	var message = registry.name + " acaba de enviar una alerta al sitema. Requiere asistencia.\n" +
		"Numeros de teléfono registrados: \n";

	if (registry.phone instanceof Array){
		for (number in registry.phone){
			message = number + "\n";
		}		
	} else {
		message = message + registry.phone.toString() + "\n";
	}

	if (callerNumber){
		message = message + "\nEnviado desde el número: " + callerNumber;
	}

	smtpTransport.sendMail({
	   from: sender, // sender address
	   to: address, // comma separated list of receivers
	   subject: "Alerta", // Subject line
	   text:  message// plaintext body
	}, function(error, response){
	   if(error){
	       console.log(error);
	   }else{
	       console.log("Message sent: " + response.message);
	   }
	});
}