const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors())


app.get('/', (req, res) =>{
    res.send('Todo App Server is running')
})





//mongodb start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tbf6iah.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run() {
    try {
        const todoCollection = client.db('TODO').collection('todoItems')


        //get function
        app.get('/items', async(req, res)=>{
            const query = {}
            const result = await todoCollection.find(query).toArray()
            res.send(result)
        })

        //post function
        app.post('/items', async(req, res)=>{
            const query = req.body;
            const result = await todoCollection.insertOne(query)
            res.send(result)
        })

        //update function
        app.put('/items/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id)}
            const item = req.body
            const option = { upsert:true }
            updatedDoc = {
                $set: {
                    name: item.name
                }
            }
            const result = await todoCollection.updateOne(filter, updatedDoc, option)
            res.send(result)
        })

        //delete function
        app.delete('/items/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await todoCollection.deleteOne(filter)
            res.send(result)
        } )

    }
    finally{

    }
 }
 run().catch(e=>console.log(e))



app.listen(port, ()=>{
    console.log(`todo server is running on port ${port}`)
})