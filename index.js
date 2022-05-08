const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port=process.env.PORT || 5000;
const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
	res.send('Running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qhjsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('connect');


const run=async()=>{

	try{
   await client.connect();
   const carCollection = client.db("Alfa-Auto-Park").collection("car");
   app.get('/inventory',async(req,res)=>{
	   const query={};
	   const cursor=  carCollection.find(query);
	   const result= await cursor.toArray()
	   if(result.length==0) {
		   return res.send({success:false,error:'No document found'})
	   }
	   res.send({success:true,data:result})
   });

   app.get('/inventory/:id',async(req,res)=>{
	   const id =req.params.id;
	   const query={_id:ObjectId(id)};
	   const result=await carCollection.findOne(query);
	   res.send({success:true,data:result})
   })
   ;

   //update 
   app.put('/inventory/:id',async(req,res)=>{
	   const id=req.params.id;
	   const updatedUser=req.body;
	   const filter={_id:ObjectId(id)};
	   const options={upsertedId:true};
	   const updateDoc={
		   $set:{
                 quantity:updatedUser.quantity
		   }
	   }
	  const result= await carCollection.updateOne(filter,updateDoc,options);
	  res.send(result);

   })

 
	}
	catch{

	}
}
run()


app.listen(port,()=>{
	console.log('listen port', port);
})