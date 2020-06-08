/*Global Variables*/
var jsChildren2 = [];

$(document).ready(function () {
    ReadFile();
    $('#trVw').on("changed.jstree", function (e, data) {
        OpenTagPopUp(e,data);
      });
});

function OpenTagPopUp(e,data) {
    //alert('open');
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
