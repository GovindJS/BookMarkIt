function addnew_boomark(removeCallback,editCallback,bookmark){
    console.log(bookmark);
    let item = $(`<div class="bookmark_item"></div>`)
    item.append(createTitle(bookmark.title));
    item.append(goButton(bookmark.address));
    item.append(editButton(editCallback,bookmark.id));
    item.append(removeButton(removeCallback,bookmark.id));
    // let newbookmark = $(
    //    `
    //    <div class="bookmark_title">
    //        ${bookmark.title} 
    //    </div>
    //    <button class="button gobutton"><a href="${bookmark.address}"><i class="fas fa-globe"></i></a></button>
    //    <button class="button editbutton"><i class="fas fa-edit"></i></button>
    //    <button class="button removebutton"><i class="fas fa-trash"></i></i></button>
    //    `
    // )
    return item;
}
function createTitle(text){
    let title = $(
        `<div class="bookmark_title">
               ${text} 
        </div>
        `
    )
    return title;
}


function goButton(address){
     let button =$(`<button class="button gobutton"><a href="${address}"><i class="fas fa-globe"></i></a></button>`)
     return button;
}
function editButton(editCallback,id){
    let button =$(` <button class="button editbutton"><i class="fas fa-edit"></i></button>`)
    button.click((event)=>{editCallback(event,id)})
    return button;
}
function removeButton(removeCallback,id){
    let button = $(`<button class="button removebutton"><i class="fas fa-trash"></i></i></button>`)

    button.click((event)=>{
        removeCallback(event,id)
    })

    return button;
}
 