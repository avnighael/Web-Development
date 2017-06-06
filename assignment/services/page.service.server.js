var app = require('../../express');

app.get("/api/assignment/website/:websiteId/page",findPageByWebsiteId);
app.get("/api/assignment/page/:pageId",findPageById);
app.post("/api/assignment/website/:websiteId/page",createPage);
app.put("/api/assignment/page/:pageId", updatePage);
app.delete("/api/assignment/page/:pageId", deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "567", "name": "Blog", "websiteId": "123", "description": "Lorem ipsum" }
];

function deletePage(req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.sendStatus(200) ;
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.json(pages[p]) ;
            return;
        }
    }
    res.sendStatus(404);
}

function findPageByWebsiteId(req, res) {
    var result = [];
    var websiteId = req.params.websiteId;

    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            result.push(pages[p]);
        }
    }
    res.json(result);

}
