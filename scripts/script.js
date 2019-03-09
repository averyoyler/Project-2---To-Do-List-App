let g_showDisplay = true;
let g_currentListName;

function openBottomNav(){
    $('#bottomNavId').css('height', '681px');
    $('#bottomNavId').css('bottom', '12.6%');
    // document.getElementById('bottomNavId').style.height = '640px';
    // document.getElementById('bottomNavId').style.bottom = '17%';
    $('#listNameId').focus();
    $('.listName').css('border', 'none');
}

function closeBottomNav(){
    $('#bottomNavId').css('height', '0');
    $('#bottomNavId').css('bottom', '-100px');

    // document.getElementById('bottomNavId').style.height = '0';
    // document.getElementById('bottomNavId').style.bottom = '-100px';
}

function checkKey(event){
    switch(event.keyCode){
        case 13:
            newList();
            $('#listNameId').val('');
            break;
    }
}

(function(){
    if(localStorage.listy){
        let myData = JSON.parse(localStorage.listy);

        for(let l = 0; l < myData.length; l++){

            listyLists.add(myData[l].name);

            for(let i = 0; i < myData[l].collection.length; i++){
                listyLists.collection[l].add(myData[l].collection[i].name, myData[l].collection[i].completed);
            }

        }
        pagePrint(listyLists.collection);
    }
})();


function newList(){
    let inputValue = $('#listNameId').val();
    let doubleInput = false;
    if(inputValue !== '') {
        for(let i = 0; i < listyLists.collection.length; i++) {
            if(inputValue === listyLists.collection[i].name) {
                console.log('double value');
                doubleInput = true;
            }
        }
        if(doubleInput === false) {
            listyLists.add(inputValue); // take value of input (list) and send it to ListCollection add method (adds list to list collection)
            saveData();
            $('.listName').css('border', 'none');
            closeBottomNav();
        }
        else {
            console.log('can/"t create list');
            $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
        }
    }
}

function saveData(){
    localStorage.setItem('listy', JSON.stringify(listyLists.collection));
    retrieveData();
}

function retrieveData(){
    $('.lists').html('');
    let listyData = JSON.parse(localStorage.listy);
    console.log(listyData);
    pagePrint(listyData);
}

function pagePrint(listyData){
    for(let l = 0; l < listyData.length; l++){

        let listItems = '';

        for(let i = 0; i < listyData[l].collection.length; i++){
            listItems +=
                "<div class='taskRow'>" +
                    "<div>" + listyData[l].collection[i].name + "</div>" +
                "<div class='centered'>" +
                    "<div><i class=\"far fa-edit small\"></i></div>" +
                    "<div class='deleteListItemButton' onclick='deleteItem(this)'><i class=\"fas fa-trash small\"></i></div>" +
                "</div>" +
                "</div>";  // content editable
        }

        $('.lists').append(
            "<div class='rowWrapper'>" +
                "<div class='row' onclick='toggleListDisplay()'>" +
                    "<div class='centered'>" +
                        "<i class=\"fas fa-chevron-circle-down small\"></i>" +
                        "<i class=\"fas fa-clipboard-list\"></i>" +
                        "<span>" + listyData[l].name + "</span>" +
                    "</div>" +
            "<div class='centered medium'>" +
                    "<div class='centered'>" +
                        "<input onkeyup='addItem(this, this.value, event, " + l + ")' type='text' placeholder='Add Item...' class='itemInput' style='background-color: #4F6D7A'>" +
                    "</div>" +
                    "<div><i class=\"far fa-edit\" onclick='editListName(this)'></i></div>" +
                    "<div class='deleteListButton' onclick='deleteList(this)'><i class=\"fas fa-trash\"></i></div>" + //$#215 is an x symbol
                "</div>" +
            "</div>" +
                "<div class='itemBox'>" +
                    "<div class='spacedRow'>" +
                            listItems +
                    "</div>" +
                "</div>" +
            "</div>");
    }
}

function addItem(element, incVal, event, listNumber){
    switch(event.key){
        case "Enter":
            $(element).val('');
            listyLists.collection[listNumber].add(incVal, false);
            saveData();
            break;
    }
}

function toggleListDisplay(){
    if(g_showDisplay) {
        g_showDisplay = false;
        $('.itemBox').css('display', 'none');
    }
    else {
        g_showDisplay = true;
        $('.itemBox').css('display', 'block');
    }
}

// DELETE

function deleteList(element) {
    console.log(element);
    // let targetedList = $(element).parent().parent().get(0).firstChild.children[1].innerHTML;
    let targetedList = $(element).parent().parent().get(0).firstChild.children[2].innerHTML;
 // console.log(targetedList);
 // console.log(listyLists.collection);
    for(let l = 0; l < listyLists.collection.length; l++) {
        if(listyLists.collection[l].name === targetedList) {
 // console.log(listyLists.collection[l].name);
            listyLists.collection.splice(l,1);
            saveData();
            break;
        }
    }
}

function deleteItem(element) {
    // let targetedItem = $(element).parent().parent().get(0).firstChild.innerHTML;
    let targetedItem = $(element).parent().parent().get(0).firstChild.innerHTML;
// console.log(targetedItem);
// console.log(listyLists.collection);
    for(let l = 0; l < listyLists.collection.length; l++) {
        for(let i = 0; i < listyLists.collection[l].collection.length; i++) {
            if(listyLists.collection[l].collection[i].name === targetedItem) {
// console.log("collection task name", listyLists.collection[l].collection.name);
                listyLists.collection[l].collection.splice(i,1);
                saveData();
                break;
            }
        }
    }
}

// SAVE

function saveListName(element) { // TODO
    // get new/edited list name
    let inputValue = $('#listNameId').val();
    let editListIndex = 0;
    let doubleInput = false;


    // get index for the list being edited
console.log(g_currentListName);
    for(editListIndex = 0; editListIndex < listyLists.collection.length; editListIndex++) {
        if(listyLists.collection[editListIndex].name === g_currentListName) {
console.log(listyLists.collection[editListIndex].name);
            break;
        }
    }

    // check for and ignore empty list name //TODO error ?
    if(inputValue !== '') {
        // check for duplicate list names
        for(let i = 0; i < listyLists.collection.length; i++) {
            if(i === editListIndex) {
                break;
            }
            if(inputValue === listyLists.collection[i].name) {
console.log('double value');
                doubleInput = true;
                break;
            }
        }

        if(doubleInput === false) {
            // not a duplicate - edit list
            listyLists.collection[editListIndex].name = inputValue;
            saveData();
            closeBottomNav();
        }
        else {
            // disallow duplicates
console.log('can/"t create list');
            $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4'); //TODO FIX BORDER
        }
    }
}

// EDIT

function editListName(element) { // TODO
    g_currentListName = $(element).parent().parent().parent().get(0).children[0].children[2].innerHTML;
    $('#listNameId').val(g_currentListName);
    $('.listName').css('border', 'none');

    console.log(g_currentListName);
    $('.title').html('EDIT LIST');
console.log($('.title').html());
    $('.button').html('SAVE');
console.log($('.button').html());
    openBottomNav();
}

// CREATE

function createList() {
    $('#listNameId').val('');
    $('.listName').css('border', 'none');

    $('.title').html('CREATE A LIST');
console.log($('.title').html());

    $('.button').html('CREATE');
console.log($('.button').html());
    openBottomNav();
}



// SUBMIT

function bottomNavSubmit(element) {
    // let buttonText = $(element).parent().parent().get(0).firstChild.children[2].innerHTML;
    let buttonText = $(element).parent().get(0).children[0].innerHTML;
    console.log(buttonText);
    if(buttonText === 'CREATE') {
        newList();
    }
    else {
        saveListName();
    }
}












// CONTENT EDITABLE

/*

    What I Need:
        - Value of the task name
        - Which list [l]
        - Which item [i]

 */

// DELETE LIST

/*

    What I Need:
        - Index of list
        - Value of list

 */





















/*


$('.lists').append("<div><span>" + listyData[l].name + "</span>" +
            "<input onkeyup='addItem(this, this.value, event, " + l + ")' type='text' placeholder='Add Item...' class='itemInput'>" +
            "<div class='itemBox'>" + listItems + "</div>" +
            "</div>");






function checkKey(event){
    switch(event.which) {
        case 13:
            addListItem();
            $('#listNameId').val('');
            closeBottomNav();
    }
}


function addListItem(){
    let listInputValue = $('#listNameId').val();
    if (listInputValue !== '') {
        let id = `${Date.now()}`;
        $('.lists').append(
            "<div id=" + id + " class='rowWrapper'>" +
                "<div class='row'>" +
                    "<div>" +
                        "<i class=\"fas fa-clipboard-list\"></i>" +
                        "<span contenteditable='true'>" + listInputValue + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<span class='deleteListButton' onclick='deleteList(this)'>&#215;</span>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
        $('#listNameId').val('');
        saveList(id, listInputValue); // new
        closeBottomNav();
    }
}

function deleteList(element){
    $(element).parent().parent().parent().hide('slide', function(){
        $(element).parent().parent().parent().remove();
    })
}


// new

function saveList(listId, listName) {
    const stringifiedList = JSON.stringify(listName);
    localStorage.setItem(listId, stringifiedList);
}

function retrieveLocalStorageList(listId) {
    return JSON.parse(localStorage.getItem(listId));
}


*/
