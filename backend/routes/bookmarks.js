const express = require('express');
const router = express.Router();
const Tasks = require('../objects/bookmarks');
const mongoose = require('mongoose');


let tasks = new Tasks.create();

// mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser: true, useUnifiedTopology: true})
// const db = mongoose.connection;
// db.on('error',()=>{
//     console.log("Error connecting")
// })
// db.once('open',()=>{
//     console.log('We are successfuly connected to Database')
// })

router.get('/changeuser/',(req,res)=>{
    mongoose.connection.close();
    res.send("disconnected");
})

router.get('/changeuser/:username',(req,res)=>{
    user = req.params.username;
    tasks.updateAll()
    
    const url = 'mongodb://localhost:27017/'+ user;
    console.log(url);
    const db = mongoose.connection;

    db.on('error',()=>{
        console.log("Error connecting")
    })
    db.once('open',()=>{
        console.log('We are successfuly connected to Database')
    })
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
    res.send("connecting to "+ user);
})

router.get('/', (req,res) => {
    
    res.json(tasks.getAll());
});

router.post('/',(req,res) => {
    let text = req.body.text.trim();
    let address = req.body.address.trim();
    if(address && text){
        tasks.add(text,address);
    }
    res.redirect('/bookmarks')
})
router.get('/:id',(req,res)=>{
    res.json(tasks.get(req.params.id));
})

router.delete('/:id',(req,res)=>{
    tasks.remove(req.params.id);
    
})
router.put('/:id',(req,res)=>{
    let title = req.body.text.trim();
    let address = " "
    if(title != undefined){
        tasks.edit(title,address,req.params.id);
    }
    res.redirect('/bookmarks')
})


module.exports =  { router }
