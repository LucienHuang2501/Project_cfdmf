const express=require('express');
const pool=require('../pool.js')

var router=express.Router();

//用户注册
router.post('/reg',(req,res)=>{
	var obj=req.body;
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd){
		res.sennd({code:402,msg:'upwd required'});
		return;
	}
	if(!obj.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	pool.query('INSERT INTO cfdmf VALUES SET ?',[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'reg suc'});
		}
	})
});
//用户登录
router.post('/login',(req,res)=>{
	var obj=req.body;
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	pool.query('SELECT * FROM cfdmf WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
		if(err) throw err;
		if(obj.length>0){
			res.send({code:200,msg:'login suc'});
		}
		else{
			res.send({code:301,msg:'login err'});
		}
	});
});
//修改用户
router.post('/update',(req,res)=>{
	var obj=req.body;
	var i=400;
	for(var key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+' required'});
			return;
		}
	}
	pool.query('UPDATE cfdmf SET email=?,phone=?,user_name=?,gender=? WHERE uid=?',
		[obj.email,obj.phone,obj.user_name,obj.gender,obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}
	})
});

module.exports=router;