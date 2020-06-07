$(document).ready(function () {
    ReadFile();
});

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
            'data': jsonFrm
        }
    });
}

function JsonFormat(json) {
    var js = JSON.parse(json);
    var jsArray = [];
    var jsChildren = [];

    $(js.units).each(function (index, element) {
        //jsChildren.push(element.name + " (" + element.code + ")");
        
        $(element.EPC).each(function (idx, ele) {
            var jsChildren2 = [];
            if(ele[1] != null){
                $(ele[1].pc).each(function (id, el) {
                    var jsChildren3 = [];
                    if(el["1.1"] != null){
                        jsChildren3.push({"text" :el["1.1"].text});
                    }
                    if(el["1.2"] != null){
                        jsChildren3.push({"text" :el["1.2"].text});
                    }
                    if(el["1.3"] != null){
                        jsChildren3.push({"text" :el["1.3"].text});
                    }
                    if(el["1.4"] != null){
                        jsChildren3.push({"text" :el["1.4"].text});
                    }
                    if(el["1.5"] != null){
                        jsChildren3.push({"text" :el["1.5"].text});
                    }
                    if(el["1.6"] != null){
                        jsChildren3.push({"text" :el["1.6"].text});
                    }
                    if(el["1.7"] != null){
                        jsChildren3.push({"text" :el["1.7"].text});
                    }
                    jsChildren2.push({"text" : ele[1].name, "children" : jsChildren3});
                });            
            }
            if(ele[2] != null){
                $(ele[2].pc).each(function (id, el) {
                    var jsChildren3 = [];
                    if(el["2.1"] != null){
                        jsChildren3.push({"text" :el["2.1"].text});
                    }
                    if(el["2.2"] != null){
                        jsChildren3.push({"text" :el["2.2"].text});
                    }
                    if(el["2.3"] != null){
                        jsChildren3.push({"text" :el["2.3"].text});
                    }
                    if(el["2.4"] != null){
                        jsChildren3.push({"text" :el["2.4"].text});
                    }
                    if(el["2.5"] != null){
                        jsChildren3.push({"text" :el["2.5"].text});
                    }
                    if(el["2.6"] != null){
                        jsChildren3.push({"text" :el["2.6"].text});
                    }
                    if(el["2.7"] != null){
                        jsChildren3.push({"text" :el["2.7"].text});
                    }
                    jsChildren2.push({"text" : ele[1].name, "children" : jsChildren3});
                }); 
            }
            if(ele[3] != null){
                $(ele[3].pc).each(function (id, el) {
                    var jsChildren3 = [];
                    if(el["3.1"] != null){
                        jsChildren3.push({"text" :el["3.1"].text});
                    }
                    if(el["3.2"] != null){
                        jsChildren3.push({"text" :el["3.2"].text});
                    }
                    if(el["3.3"] != null){
                        jsChildren3.push({"text" :el["3.3"].text});
                    }
                    if(el["3.4"] != null){
                        jsChildren3.push({"text" :el["3.4"].text});
                    }
                    if(el["3.5"] != null){
                        jsChildren3.push({"text" :el["3.5"].text});
                    }
                    if(el["3.6"] != null){
                        jsChildren3.push({"text" :el["3.6"].text});
                    }
                    if(el["3.7"] != null){
                        jsChildren3.push({"text" :el["3.7"].text});
                    }
                    jsChildren2.push({"text" : ele[1].name, "children" : jsChildren3});
                }); 
            }
            if(ele[4] != null){
                $(ele[4].pc).each(function (id, el) {
                    var jsChildren3 = [];
                    if(el["4.1"] != null){
                        jsChildren3.push({"text" :el["4.1"].text});
                    }
                    if(el["4.2"] != null){
                        jsChildren3.push({"text" :el["4.2"].text});
                    }
                    if(el["4.3"] != null){
                        jsChildren3.push({"text" :el["4.3"].text});
                    }
                    if(el["4.4"] != null){
                        jsChildren3.push({"text" :el["4.4"].text});
                    }
                    if(el["4.5"] != null){
                        jsChildren3.push({"text" :el["4.5"].text});
                    }
                    if(el["4.6"] != null){
                        jsChildren3.push({"text" :el["4.6"].text});
                    }
                    if(el["4.7"] != null){
                        jsChildren3.push({"text" :el["4.7"].text});
                    }
                    jsChildren2.push({"text" : ele[1].name, "children" : jsChildren3});
                }); 
            }
            if(ele[5] != null){
                $(ele[5].pc).each(function (id, el) {
                    var jsChildren3 = [];
                    if(el["5.1"] != null){
                        jsChildren3.push({"text" :el["5.1"].text});
                    }
                    if(el["5.2"] != null){
                        jsChildren3.push({"text" :el["5.2"].text});
                    }
                    if(el["5.3"] != null){
                        jsChildren3.push({"text" :el["5.3"].text});
                    }
                    if(el["5.4"] != null){
                        jsChildren3.push({"text" :el["5.4"].text});
                    }
                    if(el["5.5"] != null){
                        jsChildren3.push({"text" :el["5.5"].text});
                    }
                    if(el["5.6"] != null){
                        jsChildren3.push({"text" :el["5.6"].text});
                    }
                    if(el["5.7"] != null){
                        jsChildren3.push({"text" :el["5.7"].text});
                    }
                    jsChildren2.push({"text" : ele[1].name, "children" : jsChildren3});
                }); 
            }
            jsChildren.push({"text" : element.name + " (" + element.code + ")", "children" : jsChildren2 });            
        });
    });

    jsArray = {
        "text": js.name + " (" + js.code + ")",
        "state" : {"opened" : true },
        "children": jsChildren
    };
    var jsonFrm = JSON.parse(JSON.stringify(jsArray));
    return jsonFrm;
}
