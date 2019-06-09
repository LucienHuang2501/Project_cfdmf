const express=require('express');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user')
var server=express();
server.listen(8080);

server.use(bodyParser.urlencoded({
	extended:false
}));
server.use(express.static('public'));
server.use("/user/login",userRouter);