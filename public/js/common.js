var parseUrl = new URL(window.location.href);
var basicURL = parseUrl.origin;


$(document).on('click', '.send_message_button', function() {
    $('.send_message_button').hide();

     setTimeout(doSomething, 5000);
});


$(document).on('click', '.start_button', function() {
    console.log("start");
    setTimeout(doSomething, 5000);
});


function doSomething() {
    console.log("10 seconds");
    $.get( basicURL + "?getCountMasseges=get", function( data ) {
        var count  = JSON.parse(data);
        $('.no_send_masseges').html(count[0]);
        $('.send_messages').html(count[1]);

    });
    setTimeout(doSomething, 5000);
}


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

    $('.get_loader').click(loading);

});