function openBottomNav(){
    $('#bottomNavId').css('height', '681px');
    $('#bottomNavId').css('bottom', '12.6%');
    // document.getElementById('bottomNavId').style.height = '640px';
    // document.getElementById('bottomNavId').style.bottom = '17%';
    $('#listNameId').focus();
}

function closeBottomNav(){
    $('#bottomNavId').css('height', '0');
    $('#bottomNavId').css('bottom', '-100px');

    // document.getElementById('bottomNavId').style.height = '0';
    // document.getElementById('bottomNavId').style.bottom = '-100px';
}

function addListItem(){
    let listInputValue = $('#listNameId').val();
    if (listInputValue !== '') {
        $('.lists').append(
            "<div class='rowWrapper'>" +
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
        closeBottomNav()
    }
}