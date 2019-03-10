let g_showDisplay = true;
let g_currentListName;
let g_listToWhichTaskBelongs;
let g_currentTaskName;

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
    switch(event.key){
        case 'Enter':
            bottomNavSubmit();
            break;
    }
}

(function(){
    if(localStorage.listy){
        let myData = JSON.parse(localStorage.listy);

        for(let l = 0; l < myData.length; l++){

            listyLists.add(myData[l].name);

            for(let i = 0; i < myData[l].collection.length; i++){
                console.log(l, i, myData[l].collection[i].name, myData[l].collection[i].completed);
                listyLists.collection[l].add(myData[l].collection[i].name, myData[l].collection[i].completed);
                console.log(l, i, listyLists.collection[l].collection[i].name, listyLists.collection[l].collection[i].completed);

            }

        }
        pagePrint(listyLists.collection);
    }
})();

// NEW

function newList(){
    let inputValue = $('#listNameId').val();
    let doubleInput = false;
    if(inputValue !== '') {
        for(let i = 0; i < listyLists.collection.length; i++) {
            if(inputValue === listyLists.collection[i].name) {
                console.log('double value');
                doubleInput = true;
                break;
            }
        }
        if(doubleInput === false) {
            listyLists.add(inputValue); // take value of input (list) and send it to ListCollection add method (adds list to list collection)
            saveData();
            closeBottomNav();
        }
        else {
            console.log('can/"t create list');
            $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
        }
    }
    else{
        $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
    }
}

function newTask() {
    let editListIndex = 0;
    let inputValue = $('#listNameId').val();


    for(editListIndex = 0; editListIndex < listyLists.collection.length; editListIndex++) {
        if(listyLists.collection[editListIndex].name === g_listToWhichTaskBelongs) {
            // found editListIndex index
            console.log(listyLists.collection[editListIndex].name);
            break;
        }
    }

    let doubleInput = false;
    if(inputValue !== '') {
        for(let i = 0; i < listyLists.collection[editListIndex].collection.length; i++) {
            if(inputValue === listyLists.collection[editListIndex].collection[i].name) {
                console.log('double value');
                doubleInput = true;
                break;
            }
        }
        if(doubleInput === false) {
            listyLists.collection[editListIndex].add(inputValue);
            saveData();
            closeBottomNav();
        }
        else {
            console.log('can/"t create list');
            $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
        }
    }
    else{
        $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
    }
}

// SAVE AND RETRIEVE (LOCAL STORAGE)

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
            console.log(l, i, listyData[l].collection[i].name, listyData[l].collection[i].completed);
            let checkedBoolean = listyData[l].collection[i].completed;
            if(checkedBoolean) {
                listItems +=
                    "<div class='taskRow'>" +
                    "<div class='centered'>" +
                    "<input onclick='toggleTaskCompleted(this)' class='taskCheckbox' type='checkbox' checked='checked'>" +
                    "<div>" + listyData[l].collection[i].name + "</div>" +
                    "</div>" +
                    "<div class='centered'>" +
                    "<div><i class=\"far fa-edit small\" onclick='openEditListItemDialog(this)'></i></div>" +
                    "<div class='deleteListItemButton' onclick='deleteItem(this)'><i class=\"fas fa-trash small\"></i></div>" +
                    "</div>" +
                    "</div>";  // content editable
            }
            else {
                listItems +=
                    "<div class='taskRow'>" +
                    "<div class='centered'>" +
                    "<input onclick='toggleTaskCompleted(this)' class='taskCheckbox' type='checkbox'>" +
                    "<div>" + listyData[l].collection[i].name + "</div>" +
                    "</div>" +
                    "<div class='centered'>" +
                    "<div><i class=\"far fa-edit small\" onclick='openEditListItemDialog(this)'></i></div>" +
                    "<div class='deleteListItemButton' onclick='deleteItem(this)'><i class=\"fas fa-trash small\"></i></div>" +
                    "</div>" +
                    "</div>";  // content editable
            }
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
                        // "<input onkeyup='addItem(this, this.value, event, " + l + ")' type='text' placeholder='Add Item...' class='itemInput' style='background-color: #4F6D7A'>" +
                    "<div><i class=\"fas fa-plus\" onclick='openCreateListItemDialog(this)'></i></div>" +
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

function addItem(element, incVal, event, listNumber){ // TODO CHANGE
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
    let targetedItem = $(element).parent().parent().get(0).firstChild.children[1].innerHTML;
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

function deleteCompletedTasks() {
// console.log(listyLists.collection);
    for(let l = 0; l < listyLists.collection.length; l++) {
        for(let i = 0; i < listyLists.collection[l].collection.length; i++) {
            if(listyLists.collection[l].collection[i].completed === true) {
// console.log("collection task name", listyLists.collection[l].collection.name);
                listyLists.collection[l].collection.splice(i,1);
                saveData();
            }
        }
    }
}

// SAVE

function saveListName() { // TODO
    // get edited list name
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

function saveTaskName() {
    let inputValue = $('#listNameId').val();
    let editTaskIndex = 0;
    let editListIndex = 0;
    let doubleInput = false;


    // get index for the list being edited
    console.log('list    ' + g_currentListName);
    console.log('task    ' + g_currentTaskName);

    for(editListIndex = 0; editListIndex < listyLists.collection.length; editListIndex++) {
        for(editTaskIndex = 0; editTaskIndex < listyLists.collection[editListIndex].collection.length; editTaskIndex++) {
            if(listyLists.collection[editListIndex].collection[editTaskIndex].name === g_currentTaskName) {
                console.log(editListIndex, editTaskIndex);
                break;
            }
        }
        if(editTaskIndex < listyLists.collection[editListIndex].collection.length) {
            break;
        }
    }


    // check for and ignore empty task name //TODO error ?
    if(inputValue !== '') {
        // check for duplicate task names
        for(let i = 0; i < listyLists.collection[editListIndex].collection.length; i++) {
            if(i === editTaskIndex) {
                break;
            }
            if(inputValue === listyLists.collection[editListIndex].collection[i].name) {
                console.log('double value');
                doubleInput = true;
                break;
            }
        }

        if(doubleInput === false) {
            // not a duplicate - edit task
            listyLists.collection[editListIndex].collection[editTaskIndex].name = inputValue;
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

function editListName(element) { // edit bottom nav content title
    g_currentListName = $(element).parent().parent().parent().get(0).children[0].children[2].innerHTML;
    $('#listNameId').val(g_currentListName);
    $('.listName').css('border', 'none');

console.log(g_currentListName);
    $('.title').html('EDIT LIST');
    $('.button').html('SAVE');
    openBottomNav();
}

function openEditListItemDialog(element) { // TODO
    g_currentTaskName = $(element).parent().parent().parent().get(0).children[0].children[1].innerHTML;
    g_currentListName = $(element).parent().parent().parent().parent().parent().parent().get(0).children[0].children[0].children[2].innerHTML;
console.log(g_currentTaskName);
    $('#listNameId').val(g_currentTaskName);
    $('.listName').css('border', 'none');

    $('.title').html('EDIT TASK');
    $('.button').html('SAVE');
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

function openCreateListItemDialog(element) { // TODO
    g_listToWhichTaskBelongs = $(element).parent().parent().parent().get(0).children[0].children[2].innerHTML;
// console.log(g_listToWhichTaskBelongs);

    $('#listNameId').val('');
    $('.listName').css('border', 'none');

    $('.title').html('CREATE A TASK');
    console.log($('.title').html());

    $('.button').html('CREATE');
    console.log($('.button').html());
    openBottomNav();
}


// SUBMIT

function bottomNavSubmit() {
    let titleName = $('.title').html();
console.log(titleName);
    if(titleName === 'CREATE A LIST') {
        newList();
    }
    else if(titleName === 'EDIT LIST') {
        saveListName();
    }
    else if(titleName === 'CREATE A TASK') {
        newTask();
    }
    else if(titleName === 'EDIT TASK') {
        saveTaskName();
    }
}

// COMPLETED

function toggleTaskCompleted(element){
    let checkboxInputBoolean = $(element).get(0).checked;
    let checkedListName = $(element).parent().parent().parent().parent().parent().get(0).children[0].children[0].children[2].innerHTML;
    let checkedTaskName = $(element).parent().get(0).children[1].innerHTML;

    console.log(checkboxInputBoolean);
    console.log(checkedListName);
    console.log(checkedTaskName);

    for(let listIndex = 0; listIndex < listyLists.collection.length; listIndex++) {
        console.log(listyLists.collection[listIndex].name);
        if(listyLists.collection[listIndex].name === checkedListName) {
            console.log('found list');
            for(let taskIndex = 0; taskIndex < listyLists.collection[listIndex].collection.length; taskIndex++) {
                if(listyLists.collection[listIndex].collection[taskIndex].name === checkedTaskName) {
                    console.log('found it');
                    if(checkboxInputBoolean === true) {
                        listyLists.collection[listIndex].collection[taskIndex].completed = true;
                    }
                    else {
                        listyLists.collection[listIndex].collection[taskIndex].completed = false;
                    }
                    saveData();
                    break;
                }
            }
        }
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
