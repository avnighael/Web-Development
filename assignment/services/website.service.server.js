var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": "May 20, 2016", "lastAccessed": "August 10, 2016" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": "February 15, 2016", "lastAccessed": "July 11, 2016"  },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "created": "March 20, 2016", "lastAccessed": "December 30, 2016"  },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "created": "June 30, 2016", "lastAccessed": "October 17, 2016"  },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": "January 31, 2017", "lastAccessed": "April 23, 2017"  },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": "March 13, 2017", "lastAccessed": "June 01, 2017"  },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": "April 20, 2017", "lastAccessed": "May 10, 2017"  }
];

app.get('/api/assignment/user/:userId/website',findWebsitesByUser);
app.post("/api/assignment/user/:userId/website",createWebsite);
app.get("/api/assignment/website/:websiteId",findWebsiteById);
app.put("/api/assignment/website/:websiteId",updateWebsite);
app.delete("/api/assignment/website/:websiteId",deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w] = website;
            websites[w].lastAccessed = new Date();
            res.sendStatus(200) ;
            return;
        }
    }
    res.sendStatus(404);
}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            return res.json(websites[w]);
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    website.developerId = userId;
    website.created = new Date();
    website.lastAccessed = new Date();
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function findWebsitesByUser(req,res) {
    var results = [];

    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            results.push(websites[w]);
        }
    }

res.json(results);
}
