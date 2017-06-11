var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('widgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

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
    return widgetModel.remove({_id: widgetId});
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

            return widgetModel.create(newWidget);
        },
            function (error) {
                return null;
        });
}

// function deletepage(pageId) {
//     return pageModel.remove({_id: pageId});
// }
//
// function findpageById(pageId) {
//     return pageModel.findById(pageId);
// }
//
// function updatepage(pageId, newpage) {
//     return pageModel.update({_id: pageId},
//         {$set: {
//             name : newpage.name,
//             description : newpage.description,
//             lastAccessed: new Date()
//         }
//         });
//
// }
//
// function findpagesByUser(userId) {
//     return pageModel
//         .find({_user: userId})
//         .populate('_user')
//         .exec();
// }
//
// function createpageForUser(userId, page) {
//     page._user = userId;
//     return pageModel.create(page);
// }
//
// function addPage(pageId, pageId) {
//     return pageModel
//         .findById({_id:pageId},
//             function (err, page) {
//                 page.pages.push(pageId);
//                 page.save();
//             });
// };
