function LoadTags(){
    var tg = cookie.get('tags');
    var LstTags = [];
    if (tg != null) {
        LstTags = JSON.parse(tg);
        UpdateTags(LstTags);
    }    
}

function AddTgItem(tagName) {
    var tg = cookie.get('tags');
    var LstTags = [];
    if (tg != null) {
        LstTags = JSON.parse(tg);
    }
    if (ValidateTagExists(LstTags, tagName)) {
        if (tagName == '' || tagName == '') {
            ShowError('Please type a tag name');
        }
        else {
            LstTags.push(tagName);
            cookie.set('tags', JSON.stringify(LstTags));
            UpdateTags(LstTags);
            $('#tagname').val('');
            Swal.fire({
                icon: 'success',
                title: 'Tag Added'
            });
        }
    }
    else {
        ShowError('Tag already exists');
    }
}

function UpdateTags(lstTgs) {
    $('#TgsLst').empty();
    for (var i = 0; i < lstTgs.length; i++) {
        var NewItem = document.createElement("div");
        var BtnItem = document.createElement("button");
        var SpanItem = document.createElement("span");

        NewItem.className = 'alert alert-warning alert-dismissible fade show';
        NewItem.innerHTML =' <strong>'+lstTgs[i]+'</strong>';
        NewItem.setAttribute("role", "alert");
        BtnItem.className = 'close';
        BtnItem.setAttribute("data-dismiss", "alert");
        BtnItem.setAttribute("aria-label", "close");
        SpanItem.setAttribute('aria-hidden', 'true');
        SpanItem.innerHTML = '&times;';
        BtnItem.appendChild(SpanItem);
        NewItem.appendChild(BtnItem);
        $('#TgsLst').append(NewItem);
    }


}
function ShowError(errorMsg) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg
    });
}

function ValidateTagExists(LstTags, tagName) {
    if (LstTags.length == 0) {
        return true;
    }
    for (var i = 0; i < LstTags.length; i++) {
        if (LstTags[i].toLowerCase() == tagName.toLowerCase()) {
            return false;
        }
    }
    return true;
}