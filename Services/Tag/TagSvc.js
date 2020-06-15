/*global  $,cookie,Swal,addTgItem,loadTags,console,updateTagList,showError*/

function loadTags() {
    updtTagTree();
    var tg = cookie.get("tags");
    var LstTags = [];
    if (tg != null) {
        LstTags = JSON.parse(tg);
        updateTags(LstTags);
    }
}

function updtTagTree() {
    var tgxunt = cookie.get("tagsXunit");
    var LstTgsXUnit = [];
    if (tgxunt != null) {
        LstTgsXUnit = JSON.parse(tgxunt);
    }
    updateTagTree(LstTgsXUnit);
}

function addTgItem(tagName) {
    var tg = cookie.get("tags");
    var LstTags = [];
    if (tg != null) {
        LstTags = JSON.parse(tg);
    }
    if (validateTagExists(LstTags, tagName)) {
        if (tagName == "" || tagName == "") {
            showError("Please type a tag name");
        }
        else {
            LstTags.push(tagName);
            cookie.set("tags", JSON.stringify(LstTags));
            updateTags(LstTags);
            $("#tagname").val("");
            Swal.fire({
                icon: "success",
                title: "Tag Added"
            });
        }
    }
    else {
        showError("Tag already exists");
    }
}

function updateTags(lstTgs) {
    $("#TgsLst").empty();
    var i = 0;
    var NewItem = document.createElement("div");
    var BtnItem = document.createElement("button");
    var SpanItem = document.createElement("span");
    for (i = 0; i < lstTgs.length; i = i + 1) {
        NewItem = document.createElement("div");
        BtnItem = document.createElement("button");
        SpanItem = document.createElement("span");

        NewItem.className = "alert alert-warning alert-dismissible fade show";
        NewItem.innerHTML = " <strong>" + lstTgs[i] + "</strong>";
        NewItem.setAttribute("role", "alert");
        BtnItem.className = "close";
        BtnItem.id = "tag_" + lstTgs[i];
        BtnItem.setAttribute("onClick", "RemoveTag('" + lstTgs[i] + "');");
        SpanItem.setAttribute("aria-hidden", "true");
        SpanItem.innerHTML = "&times;";
        BtnItem.appendChild(SpanItem);
        NewItem.appendChild(BtnItem);
        $("#TgsLst").append(NewItem);
    }
    updateTagList(lstTgs);
}

function updateTagList(lstTgs) {
    var ddl = $("#slcTags");
    ddl.empty();
    $(lstTgs).each(function (index, element) {
        ddl.append("<option value=" + element + ">" + element + "</option>");
    });
}

function removeTag(tagName) {
    var tg = cookie.get("tags");
    var LstTags = [];
    if (tg != null) {
        LstTags = JSON.parse(tg);
        var i = 0;
        for (i = 0; i < LstTags.length; i = i + 1) {
            if (LstTags[i] === tagName) {
                var t = LstTags.splice(i, 1);
            }
        }
        cookie.set("tags", JSON.stringify(LstTags));
        updateTags(LstTags);
    }
}

function showError(errorMsg) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg
    });
}

function validateTagExists(LstTags, tagName) {
    if (LstTags.length == 0) {
        return true;
    } 
    var i = 0;
    for (i = 0; i < LstTags.length; i = i + 1) {
        if (LstTags[i].toLowerCase() === tagName.toLowerCase()) {
            return false;
        }
    }
    return true;
}