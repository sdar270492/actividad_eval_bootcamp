const { ObjectID } = require('bson');
const express = require('express');
const mongodb = require('mongodb');

// const hostname = '0.0.0.0';
const hostname = '127.0.0.1';
const port = 8080;

const app = express();

app.use(express.json());

// var urlMongo = `mongodb://172.17.0.2:27017/`;
var urlMongo = `mongodb://localhost:27017/`;
var MongoClient = require('mongodb').MongoClient;
let db;
let collection;
MongoClient.connect(urlMongo, function (err, client) {
    if (err) return console.log(err);
    console.log("Base de Datos conectada!");
    db = client.db("bootcamp");
    collection = db.collection("personas");   
});

app.get('/', (req, res) => {    
    res.status(200);
    res.send('Welcome Api Personas for Bootcamp!');
});

app.get('/api/personas', (req, res) => {    
    collection.find().toArray()
    .then(
        result => {
            res.status(200);
            res.json(result);
        }
    )
    .catch(
        err => console.error(err)
    );
});

app.get('/api/personas/:nombres', (req, res) => {
    const nombres = req.params.nombres;
    
    collection.find({"nombres": new RegExp(nombres, 'i')}).toArray() // no respeta mayusculas y minusculas
    .then(
        result => {
            res.status(200);
            res.json(result);
        }
    )
    .catch(
        err => console.error(err)
    );
});

app.post('/api/persona', (req, res) => {
    collection.insertOne(req.body)
    .then(
        result => {
            res.status(201);
            res.json(result);
        }
    )
    .catch(
        err => console.error(err)
    );
});

app.put('/api/persona/:id', (req, res) => {
    const id = req.params.id;
    collection.updateOne(
        {_id: ObjectID(id)},
        {
            $set: {
                nombres: req.body.nombres,
                email: req.body.email,
                fec_creacion: req.body.fec_creacion,
                sexo: req.body.sexo
            }
        },
        {
            upsert: true
        })
    .then(
        result => {

            if (result.upsertedCount == 1)
            {
                res.status(201);
                res.json(result);
            }else {
                res.status(200);
                res.json(result);
            }
        }
    )
    .catch(
        err => console.error(err)
    );
});

app.delete('/api/persona/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({_id: ObjectID(id)})
    .then(
        result => {
            if (result.deletedCount == 1)
            {
                res.status(200);
                res.json(result);
            }else {
                res.status(204);
                res.json(result);
            }
        }
    )
    .catch(
        err => console.error(err)
    );
});

app.listen(port, hostname);
console.log(`listening on http://${hostname}:${port}`);