var fs = require("fs")
var readExport = function readExport(filename, next){
	fs.readFile(filename, 'utf8', (err, data) => {
		if (err) throw err;	
		const lines = data.toString().split('\n');
		// for (let line of lines)
			// console.log(line);
		//do complicated reading here
		return next(null, lines);
	});
}
module.exports = readExport