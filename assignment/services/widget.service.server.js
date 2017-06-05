var app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "name": "Lorem pixel", "text": "Lorem pixel",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "name": "Lorem pixel", "text": "Lorem pixel",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "987", "widgetType": "HTML", "pageId": "123",
        "text": '<p>Philip Pullman is back with his first addition to the <em>His Dark Materials</em> saga in almost two decades. We now know what the first novel in <em>The Book of Dust</em> trilogy will be called and, roughly, what it’s about. There’s even an excerpt out for fans eager to dive back into Lyra’s world.<br></p>'}
];

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.get("/api/assignment/page/:pageId/widget",findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId",findWidgetById);
app.post("/api/assignment/page/:pageId/widget",createWidget);
app.delete("/api/assignment/widget/:widgetId",deleteWidget);
app.put("/api/assignment/widget/:widgetId",updateWidget);
// app.put('/page/:pageId/widget', reorderWidget);

function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);

}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w].name = newWidget.name;
            widgets[w].text = newWidget.text;
            widgets[w].size = newWidget.size;
            widgets[w].url = newWidget.url;
            widgets[w].width = newWidget.width;
            res.sendStatus(200);
            return;
        }
    }
        res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;

    newWidget.pageId = pageId;
    widgets.push(newWidget);
    res.json(newWidget);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllWidgetsForPage(req, res) {
    var result=[];
    var pageId=req.params.pageId;
    for(var u in widgets)
    {
        if(widgets[u].pageId == pageId)
        {
            result.push(widgets[u]);
        }
    }
    res.json(result) ;
}

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        console.log(myFile);

        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w].url = '/assignment/uploads/' + filename;
                widgets[w].width = width;
            }
        }

        //widget = getWidgetById(widgetId);
        //widget.url = '/assignment/uploads/' + filename;

        var callbackUrl = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

        res.redirect(callbackUrl);
    }