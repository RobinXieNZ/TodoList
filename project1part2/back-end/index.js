var express = require('express');
var app =  express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
	next();
});

app.get('/',function(req,res){
	var data = ['{"id":"1","contents":"hello1","done":false}',
                '{"id":"2","contents":"hello2","done":false}',
                '{"id":"3","contents":"hello3","done":true}',
                '{"id":"4","contents":"hello4","done":false}',
                '{"id":"5","contents":"hello5","done":true}'];
	res.send(JSON.stringify(data));
	console.log('Get tasks');
});

app.get('/done/:id/done',function(req,res){
	res.send('Task done');
});

app.get('/creat',function(req,res){
	res.send('Creat task');
});

app.get('/delet/:id/delete',function(req,res){
	res.send('Delete task');
});

app.listen(port, function(){
	console.log('listening on port 8080');
});