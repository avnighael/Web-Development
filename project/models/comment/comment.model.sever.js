var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('commentModel', commentSchema);

commentModel.postComment = postComment;
commentModel.getCommentsByProjectId = getCommentsByProjectId;
commentModel.deleteComment = deleteComment;

module.exports = commentModel;

function deleteComment(commentId) {
    return commentModel.remove({_id: commentId});
}

function getCommentsByProjectId(projectId) {
    return commentModel
        .find({_project: projectId})
        .populate('_user', 'firstName lastName')
        // .populate('_user', 'lastName')
        .exec()
        .then(function (allComments) {
            return allComments;
        }, function (err) {
            console.log(err);
        })
}

function postComment(newComment) {
      // console.log(newComment);
    return commentModel
        .create(newComment)
        .then(function (comment) {
            return commentModel
                    .save(
                        commentModel
                            .findById(comment._id)
                            .populate('_user')
                            .exec())
                .then(function (ncomment) {
                    console.log("comment posted");
                    console.log(ncomment);
                })
        },function (err) {
            return err;
        });
}