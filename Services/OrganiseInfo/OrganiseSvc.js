/*Global Variables*/
var jsChildren2 = [];
var compareTxt = '';

$(document).ready(function () {
    SetEvents();
    ReadFile();
    $('#trVw').on("changed.jstree", function (e, data) {
        OpenTagPopUp(e, data);
    });
    LoadTags();
});

function SetEvents() {
    $('#slcTags').select2();
    $('#ClosePopupSetup').click(Cls);
    $('#AddTag').click(AddTg);
    $('#btn-savetag').click(AttachUnitTag);
    $('#tagname').on('keydown', function (e) {
        if (e.which == 13) {
            AddTg();
        }
    });
}

function findTg(n) {
    if (n.text.toLowerCase() === compareTxt.toLowerCase()) {
        var res = n.children.find(x => x.toLowerCase() === $('#nodename').val().toLowerCase());
        if (res == null) {
            n.children.push($('#nodename').val());
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unit already exists'
            });
        }
        return n;
    }
    else {
        return null;
    }
}

function AttachUnitTag() {
    var tagsSelected = $('#slcTags').select2('data');
    if (tagsSelected.length > 0) {
        var tgxunt = cookie.get('tagsXunit');
        var LstTgsXUnit = [];
        var unititems = [];
        if (tgxunt != null) {
            LstTgsXUnit = JSON.parse(tgxunt);
        }
        $(tagsSelected).each(function (idx, ele) {
            compareTxt = ele.text;
            var item = LstTgsXUnit.find(findTg);
            if (item == null) {
                var jsChildren = [];
                jsChildren.push($('#nodename').val());
                item = {
                    "text": ele.text,
                    "state": { "opened": true },
                    "children": jsChildren
                };
                LstTgsXUnit.push(item);
            }
        });
        cookie.set('tagsXunit', JSON.stringify(LstTgsXUnit));
        $('#slcTags').val(null).trigger('change');
        Cls();
        UpdateTagTree(LstTgsXUnit);
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please select at least one tag'
        });
    }
}

function UpdateTagTree(LstTgsXUnit) {
    $("#tagTreeView").jstree("destroy");
    $('#tagTreeView').jstree({
        'core': {
            'data': LstTgsXUnit,
            "check_callback": true,
            "themes": { "stripes": true },
        }
    });
}

function ValidateExistingTag(LstTgsXUnit) {
    var result = true;
    $(LstTgsXUnit).each(function (idx, ele) {
        if (ele.text.toLowerCase() == $('#nodename').val().toLowerCase()) {
            result = false;
        }
    });
    return result;
}

function Cls() {
    $('#nodename').val('');
    $('#popupbox').fadeOut();
}

function AddTg() {
    AddTgItem($('#tagname').val());
}

function OpenTagPopUp(e, data) {
    $('#nodeSelected').html('Please select tag/tags for: <strong>' + data.node.text + '</strong>');
    $('#nodename').val(data.node.text);
    $('#popupbox').show();
}

function ReadFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://dierf27.github.io/ADITContent/Resources/ICT60115.json", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                $('#JsonContent').val(allText);
                LoadTreeView(allText);
            }
        }
    }
    rawFile.send(null);
}

function LoadTreeView(json) {
    var jsonFrm = JsonFormat(json);
    $('#trVw').jstree({
        'core': {
            'data': jsonFrm,
            "check_callback": true,
            "themes": { "stripes": true },
        }
    });
}

function JsonFormat(json) {
    var js = JSON.parse(json);
    var jsArray = [];
    var jsChildren = [];

    $(js.units).each(function (index, element) {
        $(element.EPC).each(function (idx, ele) {
            jsChildren2 = [];
            for (var i = 1; i <= 5; i++) {
                if (ele[i] != null) {
                    CreateNode(ele, i);
                }
            }
            jsChildren.push({ "text": element.name + " (" + element.code + ")", "children": jsChildren2 });
        });
    });

    jsArray = {
        "text": js.name + " (" + js.code + ")",
        "state": { "opened": true },
        "children": jsChildren
    };
    var jsonFrm = JSON.parse(JSON.stringify(jsArray));
    return jsonFrm;
}

function CreateNode(ele, item) {
    $(ele[item].pc).each(function (id, el) {
        var jsChildren3 = [];
        for (var i = 1; i <= 9; i++) {
            if (el[item + "." + i] != null) {
                jsChildren3.push({ "text": el[item + "." + i].text });
            }
        }
        jsChildren2.push({ "text": ele[item].name, "children": jsChildren3 });
    });
}
