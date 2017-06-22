$(function() {

    var loading = function() {
        // add the overlay with loading image to the page
        var over = '<div id="overlay">' +
            '<img id="loading" src="http://bit.ly/pMtW1K">' +
            '</div>';
        $(over).appendTo('body');

        // click on the overlay to remove it
        //$('#overlay').click(function() {
        //    $(this).remove();
        //});

        // hit escape to close the overlay
        $(document).keyup(function(e) {
            if (e.which === 27) {
                $('#overlay').remove();
            }
        });
    };

    // you won't need this button click
    // just call the loading function directly
    $('button').click(loading);
    $('.start').click(loading);

});