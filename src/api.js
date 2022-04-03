const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
const mongoose = require('mongoose');
const table = require('./schema.js');
let client;
const app = express();
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use(cors());
process.env.CONTEXT = 'production';

router.get('/getAllWords', async (req, res) => {
    
    try{
        if(!DBisConnected()){
            await connectToDB();
        }

        const data = await table.words.find();
        res.send(data);
    } catch(e){
        res.send([]);
    }

  })

router.post('/addNewWord/:word', async (req, res) => {
    const word = req.params.word;
    try{
        if(!DBisConnected()){
            await connectToDB();
        }
        let record = (await table.words.find({word}))[0];
        if(!record){
            record = new table.words({word});
            await record.save();
            res.send({success:true , alreadyExists: false});
        } else{
            res.send({success:true , alreadyExists: false});
        }
        
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

router.put('/updateWord/:id/:word', async (req, res) => {
    const word = req.params.word;
    const _id = req.params.id;

    try{
        if(!!DBisConnected()){
            await connectToDB();
        }
        let record = (await table.words.find({_id}))[0];
        record.word = word;
        await record.save();
        res.send({success:true})
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

router.delete('/deleteWord/:id', async (req, res) => {
    const _id =  req.params.id;
    try{
        if(!DBisConnected()){
            await connectToDB();
        }
        const count = await table.words.deleteOne({ _id});
        res.send({success:true})
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

async function connectToDB(){
  client = await mongoose.connect( process.env.MONGO_KEY);
}

function DBisConnected() {
    return !!client && !!client.topology && client.topology.isConnected()
}
  
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)