var os = require("os")
var fs = require("fs")


var nodejsCMD = function nodejsCMD(filename, next){
	
	// console.log(os.platform()) --prints os
	const exec = require('child_process').exec;
	const stats = fs.statSync(filename)
	const fileSizeInBytes = stats.size
	console.log(fileSizeInBytes)
	const child = exec('"C:\\Program Files\\Wireshark_1.12.7\\tshark.exe" -r'+filename+">"+filename+".txt", {maxBuffer: fileSizeInBytes *10},
		(error, stdout, stderr) => {
			if(error) throw error;
			//console.log(stdout.length)
			//console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			if (error !== null) {
				console.log(`exec error: ${error}`);
			}
			return next();
	});

}
module.exports = nodejsCMD