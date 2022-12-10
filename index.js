const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run() {
    try {
        const todoCollection = client.db('TODO').collection('todoItems')



        app.get('/items', async(req, res)=>{
            const query = {}
            const result = await todoCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/items', async(req, res)=>{
            const query = req.body;
            const result = await todoCollection.insertOne(query)
            res.send(result)
        })

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