var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.deleteWidgetsOfPage = deleteWidgetsOfPage;

module.exports = widgetModel;

function deleteWidgetsOfPage(widgetId) {
    console.log("widgetId");
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId})
        .then(function (widgets) {
            var initial = parseInt(start);
            var final = parseInt(end);
            widgets.forEach(function(widgetsOfThisPage){
                if(initial < final) {
                    if (widgetsOfThisPage.order === initial) {
                        widgetsOfThisPage.order = final;
                        return widgetsOfThisPage.save();
                    }
                    else if (widgetsOfThisPage.order > initial && widgetsOfThisPage.order <= final) {
                        widgetsOfThisPage.order--;
                        return widgetsOfThisPage.save();
                    }
                }
                else {
                    if (widgetsOfThisPage.order === initial) {
                        widgetsOfThisPage.order = final;
                        return widgetsOfThisPage.save();
                    }
                    else if (widgetsOfThisPage.order < initial && widgetsOfThisPage.order >= final) {
                        widgetsOfThisPage.order++;
                        return widgetsOfThisPage.save();
                    }
                }
            });
        })
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page[0];
            pageModel
                .findById(pageId)
                .then(function (page) {
                    page.widgets.splice(page.widgets.indexOf(widgetId),1);
                    page.save();
                    return widgetModel.remove({_id: widgetId});
                }, function (err) {
                    return err;
                }, function (err) {
                    return err;
                })
        }, function (err) {
            return err;
        })
}

function updateWidget(widgetId, newWidget) {
    if(newWidget.type ==="HEADING") {
        //console.log(newWidget);
        return widgetModel
            .update({_id: newWidget._id},
                {
                    name: newWidget.name,
                    text: newWidget.text,
                    type: newWidget.type,
                    size: newWidget.size
                })
    }
    else if(newWidget.type === "HTML") {
        return widgetModel
            .update({_id: newWidget._id},
                {
                    type: newWidget.type,
                    text: newWidget.text
                })
    }
    else if(newWidget.type === "IMAGE") {
        //console.log(newWidget);
        return widgetModel
            .update({_id: newWidget._id},
                {
                    url : newWidget.url,
                    type: newWidget.type,
                    text : newWidget.text,
                    name: newWidget.name,
                    width : newWidget.width
                })
    }

    else if(newWidget.type==="YOUTUBE") {
        return widgetModel
            .update({_id: newWidget._id},
                {
                    type: newWidget.type,
                    text : newWidget.text,
                    width : newWidget.width,
                    url : newWidget.url
                })
    }

    else if(newWidget.type === "TEXT") {
        return widgetModel
            .update({_id:newWidget._id},
                {
                    type: newWidget.type,
                    text : newWidget.text,
                    rows : newWidget.rows,
                    placeholder : newWidget.placeholder,
                    formatted: newWidget.formatted
                })
    }

}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({"_page":pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id : widgetId});
}

function createWidget(pageId, newWidget) {
    newWidget._page=pageId;

    return widgetModel
        .find({_page: pageId})
        .then(function (widgets) {
            var order = widgets.length;
            newWidget.order  = order;

            return widgetModel.create(newWidget)
                .then(function (widget) {
                    return pageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            //page._website = websiteId;
                            //console.log(page._id)
                            page.widgets.push(widget._id);
                            widget.save();
                            page.save();
                            //console.log(page.widgets);
                            return widget;
                        }, function () {
                            return err;
                        });
        }, function (err) {
                return null;
        });
})
}


