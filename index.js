const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');

const db = require('./db');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect( 'mongodb://localhost:27017/urlshort' );
mongoose.connection
        .once('open',() =>{
            console.log("connected mongoose");
        })
        .on('error', (err) =>{
            console.log(err);
        });

// app.get('/', (re,res) =>{
//     res.status(200).json
// });

app.get('/', async(req,res)=>{
    try{
        const shortURLyh = await db.find()// ({short_url : req.params.show})

        if(shortURLyh == null)
            return res.status(404).json('not found');
        else{
            console.log(shortURLyh);
            res.status(200).json("done in console");
        }
    }
    catch(err){
        console.log(err);
    }

});

app.get('/:short', async(req,res) =>{
    try{
        const weget = await db.findOne({shorturl :req.params.short})
        if(weget == null){
            return res.status(400).json('not found');
        }else{
            console.log(weget);
            res.status(200).json({
                longurl : weget.longurl,
                shorturl : weget.shorturl 
            });
        }
    }catch(err){
        console.log(err);
    }
});


app.post('/short', async(req,res) =>{
    const random = shortid.generate().toString();
      console.log(random);
    await  db.create({
        longurl : req.body.longurl,
        shorturl : random
    })
    //console.log(db.long_url);
    
    res.send(`success `);
});


app.listen(3000, ()=>{
    console.log("server started");
});