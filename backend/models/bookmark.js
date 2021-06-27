const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    publicId:{
        type:Number,
        required:true
    }
});
mongoose.model('Bookmark',bookmarkSchema);