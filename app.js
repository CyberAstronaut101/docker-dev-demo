const express = require('express');
const app = express();
const port = 3000;

// =====================================================================


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:root@db:27017';
const dbName = 'dockerdevdemo';

// =====================================================================

console.log("Initiating DB connection")

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to the database', err);
        return;
    }

    const db = client.db(dbName);
    console.log('Connected to the database');



    // Add your routes and database operations here

    // Close the MongoDB connection when the app is terminated
    process.on('SIGINT', () => {
        client.close();
        console.log('Disconnected from database');
        process.exit();
    });
});


// =====================================================================


app.use(express.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get('/', (req, res) => {
    console.log("Return dummy site to hide our C2 infra")
    res.json({ "message": "Under Construction" })
})

app.get('/users', (req, res) => {
    const collection = db.collection('users');

    collection.find({}).toArray((err, docs) => {
        if (err) {
            console.error('Error retrieving users', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(docs);
    });
});

