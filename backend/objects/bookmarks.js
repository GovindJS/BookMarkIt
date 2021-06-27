const Task = require('./bookmark')
const mongoose = require('mongoose')
const bookmarkModel = require('../models/bookmark');
const Bookmark = mongoose.model('Bookmark'); 


function max(one,two){
    if(one>two){
        return one;
    }
    else{
        return two;
    }
}

function create(){

    let tasks = [];
    let id = 0;
    let temp = 0;
    Bookmark.find({}).exec((err,data)=>{
        if(err) return;
        for (let i = 0;i<data.length;i++){
            let task = new Task.create(data[i].publicId,data[i].address,data[i].title)
            temp = max(temp,data[i].publicId)
            tasks.push(task);
        }
        id = ++temp;
    })
    
    
    

    this.add = function (_title,_url){
        let _publicId = id++;
        const bookmark1 = new Bookmark({
            title:_title,
            address:_url,
            publicId:_publicId
        }).save((err)=>{
            console.log(err)
        })
        let task = new Task.create(_publicId,_url,_title);
        tasks.push(task);
    }

    this.getAll = function(){
        let simplebookmarkobjects = [];
        for(var i=0;i<tasks.length;i++){
            simplebookmarkobjects.push(converttosimple(tasks[i]));
        }
        return simplebookmarkobjects;
    }
    
    this.remove = function(_id){
        Bookmark.deleteOne({publicId:_id}).exec(err=>console.log(err))
        let index = findIndex(_id);
        tasks.splice(index,1);
    }
    this.edit = function(_title,_address,_id){
        let index = findIndex(_id);
        Bookmark.findOneAndUpdate({publicId:_id},{
            title:_title,
            address:_address,
        },(err)=>{
            console.log(err);
        })
        
        editbookmark(index,_title,_address);
    }
    
    this.get = function(_id){
        let index = findIndex(_id)
        console.log(index)
        if(index === -1){
            return {null: null} ;
        }
        let task = converttosimple(tasks[index]);
        console.log(task)
        return task;
    }

    this.updateAll = function updateAll(){
        tasks = [];
        Bookmark.find({}).exec((err,data)=>{
        
            for (let i = 0;i<data.length;i++){
                let task = new Task.create(data[i].publicId,data[i].address,data[i].title)
                temp = max(temp,data[i].publicId)
                tasks.push(task);
            }
            id = ++temp;
        })
        
    }

    function findIndex(_id){
        console.log(_id)
        for(let i = 0 ; i<tasks.length ; i++){
            if(tasks[i].getID() == _id){
                return i;
            }  
        }
        return -1;
    }
    function editbookmark(index,title,address){
        tasks[index].setTitle(title);
    }

    function converttosimple(task){
        let simpleobject = {
            title : task.getTitle(),
            address : task.getAddress(),
            id : task.getID()
        }
        return simpleobject;
    }

}
module.exports = {create}