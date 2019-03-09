let g_showDisplay = true;

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
            $('#listNameId').val('');
            saveData();
            $('.listName').css('border', 'none');
            closeBottomNav();
        }
        else {
            console.log('can/"t create list');
            $('.listName').css('border', '2px solid rgba(255, 0, 0, 0.4');
        }
        doubleInput = false;
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
                    "<div class='deleteListItemButton' onclick='deleteItem(this)'>&#215;</div>" +
                "</div>";  // content editable
        }

        $('.lists').append(
            "<div class='rowWrapper'>" +
                "<div class='row' onclick='toggleListDisplay()'>" +
                    "<div>" +
                        "<i class=\"fas fa-clipboard-list\"></i>" +
                        "<span>" + listyData[l].name + "</span>" +
                    "</div>" +
                    "<div>" +
                        "<input onkeyup='addItem(this, this.value, event, " + l + ")' type='text' placeholder='Add Item...' class='itemInput' style='background-color: #4F6D7A'>" +
                    "</div>" +
                    "<div class='deleteListButton' onclick='deleteList(this)'>&#215;</div>" +
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

function deleteList(element) {
    let targetedList = $(element).parent().get(0).firstChild.children[1].innerHTML;
    console.log(targetedList);
    console.log(listyLists.collection);
    for(let l = 0; l < listyLists.collection.length; l++) {
        if(listyLists.collection[l].name === targetedList) {
            console.log(listyLists.collection[l].name);
            listyLists.collection.splice(l,1);
            saveData();
            break;
        }
    }
}

function deleteItem(element) {
    // let targetedItem = $(element).parent().get(0).firstChild.children[1].innerHTML;
    let targetedItem = $(element).parent().get(0).firstChild.innerHTML;
    console.log(targetedItem);
    console.log(listyLists.collection);
    for(let l = 0; l < listyLists.collection.length; l++) {
        for(let i = 0; i < listyLists.collection[l].collection.length; i++) {
            if(listyLists.collection[l].collection[i].name === targetedItem) {
                console.log("collection task name", listyLists.collection[l].collection.name);
                listyLists.collection[l].collection.splice(i,1);
                saveData();
                break;
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
