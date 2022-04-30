const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
 client.connect();
 
	}
	catch{

	}
}
run()


app.listen(port,()=>{
	console.log('listen port', port);
})