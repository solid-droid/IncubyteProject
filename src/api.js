const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use(cors());

router.get('/getAllWords', async (req, res) => {
    
    try{
        await connectToDB();
        res.send([
            {name: 'Australia', edit: false},
            {name: 'Brazil', edit: false},
        ]);
    } catch(e){
        res.send([]);
    }

  })

router.post('/addNewWord/:word', async (req, res) => {
    const word = req.params.word;

    try{
        await connectToDB();
        res.send({success:true})
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

router.put('/updateWord/:word', async (req, res) => {
    const word = req.params.word;

    try{
        await connectToDB();
        res.send({success:true})
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

router.delete('/deleteWord:word', async (req, res) => {
    const word = req.params.word;

    try{
        await connectToDB();
        res.send({success:true})
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
});

async function connectToDB(){
   await mongoose.connect( process.env.MONGO_KEY);
}
  
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)