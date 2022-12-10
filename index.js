const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) =>{
    res.send('Todo App Server is running')
})


//todo_DB
//5hwrRQbWP3jOm378



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tbf6iah.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run() {
    try {
        const todoCollection = client.db('TODO').collection(todoItems)
        

    }
    finally{

    }
 }
 run().catch(e=>console.log(e))



app.listen(port, ()=>{
    console.log(`todo server is running on port ${port}`)
})