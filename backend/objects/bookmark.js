const mongoose  = require('mongoose');
const bookmarkModel = require('../models/bookmark');
const Bookmark = mongoose.model('Bookmark');


function create(_id,_address,_title){
    let id = _id;
    let address = _address;
    let title = _title;

    
    

    this.getAddress = function(){return address};
    this.getTitle = function(){return title};
    this.getID = function(){return id};

    this.setAddress = function(_address){
        if(_address.trim()){
            address = _address.trim()
        }
        
    }
   
    this.setTitle = function(_title){
        if(_title.trim()){
            title = _title.trim()
        }
    }

}
module.exports  = {create}