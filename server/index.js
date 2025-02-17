const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// middleware
const corsOptions = {
    origin: ['http://localhost:5173'],
    credential: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihwvydu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const jobsCollection= client.db('soloSphere').collection('jobs')
        const bidsCollection= client.db('soloSphere').collection('bids')
        // Connect the client to the server	(optional starting in v4.7)

// get all jobs data from db 
app.get ('/jobs', async (req,res)=>{
const result =await jobsCollection.find().toArray();
res.send(result)
})





















        //   await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello from soloSphere server... ')
});

app.listen(port, () => console.log(`server is running on port ${port} `));
