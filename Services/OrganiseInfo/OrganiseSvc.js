/*global  $,cookie,Swal,addTgItem,loadTags,console,typeof*/

var jsChildren2 = [];
var compareTxt = "";

function cls() {
    $("#nodename").val("");
    $("#popupbox").fadeOut();
}
function unuss(p) {
    console.log(p);
}

function getMainTree() {
    var json = $("#JsonContent").val();
    var jsonFrm = jsonFormat(json);
    return jsonFrm;
}

function ExportTagTree() {
    $('#loadJson').prop("disabled", false);
    var tgxunt = cookie.get("tagsXunit");
    var jsonFrm = getMainTree();
    if (tgxunt != null) {
        var LstTgsXUnit = JSON.parse(tgxunt);
        jsonFrm.children.push(LstTgsXUnit[0]);
        LstTgsXUnit = jsonFrm;
        $("#ExportTag").val(JSON.stringify(LstTgsXUnit, null, "\t"));
        try {
            var input = document.getElementById("ExportTag");
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand("copy");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error copying data in clipboard." + err.message
            });
        }
        Swal.fire({
            icon: "success",
            title: "Data successfully exported and copied to clipboard."
        });
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No data is available to export. " +
                "Please add some tags and attach to units."
        });
    }
}

function findTg(n) {
    if (n.text.toLowerCase() == compareTxt.toLowerCase()) {
        var ctxt = $("#nodename").val().toLowerCase();
        var lst = n.children;
        var res = lst.find((x) => x.toLowerCase() == ctxt);
        if (res == null) {
            n.children.push($("#nodename").val());
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unit already exists"
            });
        }
        return n;
    }
    else {
        return null;
    }
}

function updateTagTree(LstTgsXUnit) {
    $("#tagTreeView").jstree("destroy");
    $("#tagTreeView").jstree({
        "core": {
            "data": LstTgsXUnit,
            "check_callback": true,
            "themes": { "stripes": true }
        }
    });
}

function AttachUnitTag() {
    var tagsSelected = $("#slcTags").select2("data");
    if (tagsSelected.length > 0) {
        var tgxunt = cookie.get("tagsXunit");
        var LstTgsXUnit = [];
        if (tgxunt != null) {
            LstTgsXUnit = JSON.parse(tgxunt);
        }

        $(tagsSelected).each(function (idx, ele) {
            unuss(idx);
            compareTxt = ele.text;
            var item = null;
            if (LstTgsXUnit.length > 0) {
                item = LstTgsXUnit[0].children.find(findTg);
            }
            if (item == null) {
                var jsChildren = [];
                jsChildren.push($("#nodename").val());
                item = {
                    "text": ele.text,
                    "state": { "opened": true },
                    "children": jsChildren
                };
                if (LstTgsXUnit.length == 0) {
                    var jsChildrenRoot = [];
                    jsChildrenRoot.push(item);
                    itemRoot = {
                        "text": "Tag Tree",
                        "state": { "opened": true },
                        "children": jsChildrenRoot
                    };
                    LstTgsXUnit.push(itemRoot);
                }
                else {
                    LstTgsXUnit[0].children.push(item);
                }
            }
        });
        cookie.set("tagsXunit", JSON.stringify(LstTgsXUnit));
        $("#slcTags").val(null).trigger("change");
        cls();
        updateTagTree(LstTgsXUnit);
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please select at least one tag"
        });
    }
}

function ValidateExistingTag(LstTgsXUnit) {
    var result = true;
    $(LstTgsXUnit).each(function (idx, ele) {
        unuss(idx);
        if (ele.text.toLowerCase() == $("#nodename").val().toLowerCase()) {
            result = false;
        }
    });
    return result;
}

function addTg() {
    addTgItem($("#tagname").val());
}

function openTagPopUp(e, data) {
    unuss(e);
    $("#nodeSelected").html("Please select tag/tags for: <strong>" + data.node.text + "</strong>");
    $("#nodename").val(data.node.text);
    $("#popupbox").show();
}

function createNode(ele, item) {
    if (ele[item] != null) {
        $(ele[item].pc).each(function (id, el) {
            unuss(id);
            var jsChildren3 = [];
            var i;
            for (i = 1; i <= 9; i = i + 1) {
                if (
                    el[item + "." + i] != null) {

                    if (el[item + "." + i] != null) {
                        jsChildren3.push({ "text": el[item + "." + i].text });
                    }
                }
            }
            jsChildren2.push({ "text": ele[item].name, "children": jsChildren3 });
        });
    }
}

function jsonFormat(json) {
    var js = JSON.parse(json);
    var jsArray = [];
    var jsChildren = [];

    $(js.units).each(function (index, element) {
        unuss(index);
        $(element.EPC).each(function (idx, ele) {
            unuss(idx);
            jsChildren2 = [];
            var i = 1;
            for (i = 1; i <= 5; i = i + 1) {
                if (ele[i] != null) {
                    createNode(ele, i);
                }
            }
            jsChildren.push(
                {
                    "text": element.name + " (" + element.code + ")",
                    "children": jsChildren2
                });
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

function loadTreeView(json, skip) {
    var jsonFrm;
    if (skip == false) {
        jsonFrm = jsonFormat(json);
    }
    else {
        jsonFrm = json;
    }
    $("#trVw").jstree("destroy");
    $("#trVw").jstree({
        "core": {
            "data": jsonFrm,
            "check_callback": true,
            "themes": { "stripes": true }
        }
    });
    $("#trVw").on("changed.jstree", function (e, data) {
        openTagPopUp(e, data);
    });
}

function readFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://dierf27.github.io/ADITContent/Resources/ICT60115.json", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4) {
            if (rawFile.status == 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                $("#JsonContent").val(allText);
                loadTreeView(allText, false);
            }
        }
    };
    rawFile.send(null);
}

function ldJson() {
    var expt = $("#JsonContent").val();
    if (expt != '') {
        try {
            var jsond = JSON.parse(expt);
        }
        catch{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Incorrect json input detected"
            });
        }
        var json = JSON.parse(expt);
        if (expt.indexOf("pc") > -1 && expt.indexOf("1.1")) {
            loadTreeView(expt, false);
        }
        else {
            loadTreeView(json, true);
        }
        $('#ExportTag').val('');
        cookie.remove("tagsXunit");
        $("#tagTreeView").jstree("destroy");
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a JSON text"
        });
    }
}

function setEvents() {
    $("#slcTags").select2();
    $("#ClosePopupSetup").click(cls);
    $("#AddTag").click(addTg);
    $("#btn-savetag").click(AttachUnitTag);
    $("#export").click(ExportTagTree);
    $("#loadJson").click(ldJson);

    $("#tagname").on("keydown", function (e) {
        if (e.which == 13) {
            addTg();
        }
    });
    $('#ExportTag').val('');
}

$(document).ready(function () {
    setEvents();
    readFile();
    loadTags();
});