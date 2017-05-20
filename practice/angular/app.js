module.exports = function (app) {

   app.get('/api/post', findAllPosts); //Prepend with /api otherwise it looks for the file in public directory
   app.get('/api/post/:index', findPostByIndex);
   app.delete('/api/post/:index', deletePostByIndex);
   app.put('/api/post/:index', updatePostByIndex);

    var posts = [
        {title: 'Post1', body: 'body1'},
        {title: 'Post2', body: 'body2'},
        {title: 'Post3', body: 'body3'},
        {title: 'Post4', body: 'body4'},
    ];

    function deletePostByIndex(req, res) {
        var index = req.params.index;
        posts.splice(index,1);
        res.json(200);
    }

    function updatePostByIndex() {

    }

   function findPostByIndex(req,res) {
       var index = req.params['index'];
        res.json(posts[index]);
   }

       function findAllPosts(req,res) { //Prepend with /api otherwise it looks for the file in public directory

       res.json(posts);
   }
};

