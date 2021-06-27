let list = $(".bookmark_list")
var address;
let button = $('.addbutton')  
let input = $("input")
let editNew;


$( 
    
    ()=>{

    getData();

    button.click((event)=>{
        event.preventDefault();
        let text = input.val().trim();
        
        navigator.clipboard.readText().then((cliptext)=>{
            address = cliptext;
        })


        if (text && address){
            $.ajax({
                method:'POST',
                url:'http://localhost:3000/bookmarks',
                data:{
                    'text': text,
                    'address':address
                }
            }).done((res)=>{
                list.empty();
                input.val("")
                populate(res);
            })
        }
    })

function removeCallback(event,id){
        event.preventDefault();
        if(id != undefined){
            $.ajax({
                method:'DELETE',
                url:'http://localhost:3000/bookmarks/'+ id  
            }).done((res)=>{
                list.empty();
                input.val("")
                populate(res);
            })
            location.reload()
        }
}
function addTitlefield(){
    let title = $(
        `<input type="text" class="bookmark_title editnew" placeholder="Edit the Title"></input>`
    )
    return title;
}

function buttonEdit(){
    let button = $(`<button class="button editbutton "><i class="fas fa-check"></i></button>`)
    return button;
}

function editOperation(id){
    let item = $(
        `<div class="bookmark_item"></div>`
    )
    let button = buttonEdit();
    let title = addTitlefield();
    item.append(title)
    item.append(button) 
    
    button.click((event)=>{
        console.log("hemme")
        let text = title.val()
        console.log(text);
        $.ajax({
            method:'PUT',
            url:'http://localhost:3000/bookmarks/'+id,
            data : {
                'text': text,
            }
        }).done((res)=>{
            list.empty();
            input.val("")
            populate(res);
        })
        location.reload();
    })

    return item;
}

function editCallback(event,id){
    event.preventDefault();
    let element = $(event.target).parent().closest('.bookmark_item')

    element.replaceWith(editOperation(id))
    
}
function populate(res){ 
    for (let i = 0;i<res.length;i++){
            let new_item = addnew_boomark(removeCallback,editCallback,res[i]);
            list.append(new_item);
    }
}
function getData(){
    console.log("hello")
    $.ajax({
        method:'GET',
        url : 'http://localhost:3000/bookmarks/'
    }).done((res)=>{
        console.log("helllo 2")
        list.empty();
        input.val("")
        populate(res);
    })
}
    })
