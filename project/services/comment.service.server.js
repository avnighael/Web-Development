var app = require('../../express');
var commentModel = require('../models/comment/comment.model.sever');

app.post("/api/project/:projectId/comment", postComment);
app.get("/api/project/:projectId/comments", getCommentsByProjectId);
app.delete("/api/project/comment/:commentId/delete", deleteComment);

function deleteComment(req, res) {
    var commentId = req.params.commentId;

    commentModel
        .deleteComment(commentId)
        .then(function (response) {
            // console.log(response);
            res.json(response);
        },function (err) {
            res.send(err);
        })

}

function getCommentsByProjectId(req, res) {
    var projectId = req.params.projectId;

    commentModel
        .getCommentsByProjectId(projectId)
        .then(function (response) {
             // console.log(response);
            res.json(response);
        },function (err) {
            res.send(err);
        })

}

function postComment(req, res) {
    var projectId = req.params.projectId;
    var comment = req.body.text;
    var userId = req.user._id;
    var newComment = {
        _user: userId,
        _project: projectId,
        comment: comment
    };

    commentModel
        .postComment(newComment)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.send(err);
        })
}