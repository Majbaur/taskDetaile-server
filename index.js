const express=require('express')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const cors=require('cors')
const app =express()
const port=process.env.PORT || 5000

app.use(cors())
app.use(express.json())


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6sahv.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const uri = "mongodb+srv://taskDetail:PA0NMlvCA36nwUYn@cluster0.co2jc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect()
        // const productCollection = client.db("taskManager").collection("product");
        // const delearCollection = client.db("taskManager").collection("delear");
        const addedItemCollection = client.db("taskDetail").collection("addedItem");

        // app.get('/items', async (req, res) => {
        //     const query = {};
        //     const cursor = productCollection.find(query);

        //     const page = parseInt(req.query.page);
        //     const size = parseInt(req.query.size);

        //     let items;

        //     if (page || size) 
        //     {

        //         items = await cursor.skip(page*size).limit(size).toArray();
        //     }

        //     else {
        //         items = await cursor.toArray();
        //     }

        //     res.send(items)
        // })


        // app.get('/itemsCount', async (req, res) => {
        //     const query = {};
        //     const cursor = productCollection.find(query);
        //     const count = await productCollection.estimatedDocumentCount();
        //     res.send({ count })
        // })

        // app.get("/item/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const result = await productCollection.findOne(query);
        //     res.send(result);
        // })


        // app.put("/delivered/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const updatedItem = req.body;

        //     console.log(updatedItem);

        //     const filter = { _id: ObjectId(id) };

        //     const options = { upsert: true };

        //     const updatedDoc = {
        //         $set: {
        //             Quantity: updatedItem.Quantity,
        //             sale: updatedItem.sale
        //         }
        //     }

        //     const result = await productCollection.updateOne(filter, updatedDoc, options);

        //     res.send(result);

        // })
        // app.get('/delear',async(req,res)=>{
        //     const query={}
        //     const cursor=delearCollection.find(query)
        //     const delear=await cursor.toArray()
        //     res.send(delear)
        // })

        // app.put("/restock/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const updatedItem = req.body;


        //     const filter = { _id: ObjectId(id) };

        //     const options = { upsert: true };

        //     const updatedDoc = {
        //         $set: {
        //             Quantity: updatedItem.Quantity
        //         }
        //     }

        //     const result = await productCollection.updateOne(filter, updatedDoc, options);

        //     res.send(result);

        // })


// 2
        // app.post("/deleteitem" , async(req , res)=>
        // {
        //     const id = req.body;

        //     const result = await productCollection.deleteOne({ "_id" : ObjectId(id)})

        //     res.send(result)
        // })
        // app.delete('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await productCollection.deleteOne(query);
        //     res.send(result);
        // });
//  2 ses       
       
        app.get('/addedItem' , async (req, res)=>{
            
            const cursor=addedItemCollection.find()
            const addedItems=await cursor.toArray()
            res.send(addedItems)
        })
        
        app.post('/addedItem',async (req, res) => {
            const newAddedItem = req.body;
            const result = await addedItemCollection.insertOne(newAddedItem);
            res.send(result)
        })
        app.delete('/addedItem/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await addedItemCollection.deleteOne();
            res.send(result);
        });
    }

    finally {
        /* await client.close(); */
    }
}
run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('Products is Updating and waiting for New Arrival Products')
})

app.listen(port,()=>{
    console.log('Products is Updating on Website',port)
})