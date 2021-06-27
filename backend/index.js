const express = require('express');
const router = require('./routes/bookmarks')
const cors = require('cors')
const app = express();
const PORT = 3000;




app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    next();
})

app.use('/bookmarks', router.router);




app.listen(PORT);

let user = 'test';





