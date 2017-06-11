var app = require('../../express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');

app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.post("/api/assignment/page/:pageId/widget",createWidget);
app.get("/api/assignment/page/:pageId/widget",findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId",findWidgetById);
app.delete("/api/assignment/widget/:widgetId",deleteWidget);
app.put("/api/assignment/widget/:widgetId",updateWidget);
app.put('/page/:pageId/widget', reorderWidget);


function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);

    widgetModel
        .reorderWidget(pageId, initial,final)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function(widget){
            res.json(widget);
        },function(err){
            res.sendStatus(400).send(err);
        });
}


function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;

    widgetModel
        .createWidget(pageId, newWidget)
        .then(function (widget) {
            //console.log(widget);
            res.json(widget);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        },function(err){
            res.sendStatus(400).send(err);
        });
}

function findAllWidgetsForPage(req, res) {
    //var result=[];
    var pageId=req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
                res.json(widgets);
            },
            function (error) {
                res.sendStatus(400).send(error);
        });
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

        var newWidget = {
            _id: widgetId,
            url: '/assignment/uploads/' + filename,
            type: "IMAGE",
            width: width
        };

        widgetModel
            .updateWidget(widgetId,newWidget)
            .then(function (status){
                var callbackUrl = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
                res.redirect(callbackUrl);
            }, function(err){
                res.sendStatus(404).send(err);
            });
    }