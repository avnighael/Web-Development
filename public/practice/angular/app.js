/**
 * Created by avni on 5/18/17.
 */

(function(){ //IIFE = Immediately nvoked Function Expression
    angular
        .module("BlogApp", [])
        .controller("BlogPostListController", BlogPostListController);  // Decorator. Decorating the function(parameter 2) with the behavior declared in paramet 1
    
    function BlogPostListController($scope) {
        $scope.hello = 'hello world!';
        $scope.posts = [];

        // event handlers
        $scope.deletePost = deletePost;
        $scope.addPost = addPost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function addPost(post) {
            var newPost = {
                title: post.title,
                body: post.body,
                date: new Date()
            };
            $scope.posts.push(newPost);
            console.log($scope.posts);
        }

        function deletePost(index) {
             $scope.posts.splice(index, 1); //Remove 1 element starting from particular index
            // $scope.posts.splice(index, 0, [asdasd,asdf,trteh]); //If second parameter is 0 then insert at position index the elements given in third parameter
            //$http
              //  .delete('/api/post/' + index)
                //.then(findBlogPosts);
        }

        function selectPost(index) {
            $scope.post = angular.copy($scope.posts[index]);
            $scope.index = index;
        }

        function updatePost(post) {
            $scope.posts[$scope.index] = angular.copy(post);

        }
    }
    
    
})();