(function () {
    $(function () {
        var h1 = $('h1');
        h1
            .css('color', 'red')
            .html("Hello again");

        var h2 = $('<h2> Section 123 </h2>');
        var theBody = $('body');
        theBody.append(h2);

        var paragraph = $('<p>');
        paragraph.append("Lorem ipsum");
        theBody.prepend(paragraph);

        $('p').css('background-color', 'yellow')
            .draggable();

        var movies = ['Terminator', 'Avatar', 'Titanic', 'Conjuring'];

        var list = $("<ul>");
        for(var m in movies) {
            var li = $("<li>").append(movies[m]);  //More object-oriented
            //var li = $("<li>"+movies[m]+"</li>");  //More error prone
            list.append(li);
        }
        list.appendTo(theBody);

        list.sortable();
    });
})();