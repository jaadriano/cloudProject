var mysql       =   require('mysql');
var bodyParser  =	require("body-parser");
var multer	    =	require('multer');
var fs          =   require("fs");

//--- begin --- mySql connection establishment
var connection  =   mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cloudshark'
});

connection.connect();

//--- begin --- Insert to testcases
var object_query = {
    filename: 'wireshark',
    file: fs.readFileSync("C:\\ws.png"),
	profile: '2g',
	settings: 'testing'
};

//--- begin --- upload files using this function
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage }).array('userPhoto',2);

app.get('/options', function(req, res){
	connection.query('SELECT * from testcases', function (error, results, fields) {
		if (error) throw error;
		res.send(results);
	});
	console.log("Waiting for response");
	
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		console.log(req.body);
		console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("successful results of query");
	});
});
//--- end --- upload files using this function
