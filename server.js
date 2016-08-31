var express=require('express');
var mongojs=require('mongojs');
var bodyparser=require('body-parser');
var db=mongojs('contactlist',['contactlist']);
var app=express();


app.use(express.static(__dirname+"/public"));//static file they do not chnge like imges
app.use(bodyparser.json());
app.get('/contactlist',function(req,res){

console.log("I receivd a get req");

db.contactlist.find(function(err,docs){
   
  // console.log(docs);
   res.json(docs);


});

/*
person1={

	name:"tim",
	email:"123abc@gmail.com",
	number:'(111) 111 1221 '
};

person2={

	name:"timlake",
	email:"123abc@gmail.com",
	number:'(111) 111 1221 '
};

person3={

	name:"werf",
	email:"123abc@gmail.com",
	number:'(111) 111 1221 '
};

var contactlist=[person1,person2,person3];

res.json(contactlist);
*/

});


app.post('/contactlist',function(req,res){

//console.log(req.body);

db.contactlist.insert(req.body,function(err,doc){

res.json(doc);

});


});

app.delete('/contactlist/:id',function(req,res){

var id=req.params.id;
//console.log(id);
db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){

res.json(docs);

});
});

app.get('/contactlist/:id',function(req,res){
console.log("i came to edit");
var id=req.params.id;
db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
	res.json(docs);

});


});


app.put('/contactlist/:id',function(req,res){

var id=req.params.id;



db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
   update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
     
     new:true},function(err,doc){
         res.json(doc);
     });




});

app.listen(8080);
console.log("server runnig on 8080");