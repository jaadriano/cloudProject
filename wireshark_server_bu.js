var express		 =	require("express");
var bodyParser   =	require("body-parser");
var app	         =	express();
var sqldatabase  =  require("sqldatabase")
var upload       =  require("uploadfile")
var multer	     =	require('multer');
var fs           =  require("fs");
var cmd 	     =  require("cmd");
var readFile 	 =  require("readExport");
var filename;
app.use(express.static(__dirname));


// upload functionality
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	 filename = file.originalname;
	 
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).single('fileinput');

//Controller
app.get('/testcases',function(req,res){
	sqlstring = 'select profile,filename from testcases'
	sqldatabase(sqlstring, {id:'1'}, function (error, result) {
		if (error) throw error;
		res.send(result);
    });
});

app.get('/testcase-single', function(req,res){
	sqlstring = 'select filename, file from testcases WHERE filename = ?'
	sqldatabase(sqlstring, [req.query.filename], function (error, result) {
		if (error) throw error;
		
		fs.writeFile("./testcases/"+result[0].filename+".pcap", result[0].file, function(err) {
			if(err) {
				return console.log(err);
			}
			cmd("./testcases/"+result[0].filename+".pcap", function(err) {
				readFile("./testcases/"+result[0].filename+".pcap.txt", function(err, result){
					// for (let line of result)
						// console.log(line);
					res.send("testcase-single");
				});
				
			});
		}); 
    });
});

app.post('/testcases-add', function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		list = {
					filename:req.body.testcaseid, 
					file:fs.readFileSync("./uploads/"+filename), 
					profile:req.body.profile,
					settings:req.body.preferences, 
					filters:req.body.filters
				};
		sqlstring = 'INSERT INTO testcases SET ?'
		sqldatabase(sqlstring, list, function (error, result) {
		if (error) throw error;
			console.log("SQL QUERY")
			res.send(result);
		});
	});
});

app.get('/',function(req,res){
	res.render('index');
});

//the server object listens on port 8080
var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});

