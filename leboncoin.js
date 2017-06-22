var elements = [];
var links;

var utils = require('utils');
var fs = require('fs');

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
     //verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  true,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var url = casper.cli.args[0];


casper.start(url, function() {
    this.scrollToBottom();
});

casper.viewport(1920, 1080);
casper.then(function() {
    casper.wait(1000, function() {
        casper.waitForSelector('img', function() {
           // casper.capture('results/bot/screenshots/step1.png');
        });
    });
});
casper.viewport(1920, 1080);
casper.then(function() {
    /*casper.capture('results/bot/screenshots/step1.png');*/
    links = this.evaluate(getContentProducts);
    this.echo(casper.evaluate(function (myObject) {
        return JSON.stringify(myObject);
    }, links));

    ids = this.evaluate(getId);
    this.echo(casper.evaluate(function (myObject) {
        return JSON.stringify(myObject);
    }, ids));
});

casper.then(function(){



   var save =  casper.evaluate(function (myObject) {
        return JSON.stringify(myObject);
    }, links);

    var fs = require('fs');
    fs.write('myFile.json', casper.evaluate(function(myObject ) {
        return JSON.stringify(myObject);
    }, save), 'w');


    this.open('http://parser:8080/save.php', {
        method: 'post',
        data: {
            'name': '213213',
            'data': save,
        }
    });

});
/*
casper.then(function () {
    casper.capture('results/bot/screenshots/step2.png');
});
*/
casper.run(function () {
    this.exit();
});


/**
 *
 * @returns {*}
 */
function getId() {
    var links = document.querySelectorAll('section.tabsContent  ul li a.list_item div.saveAd');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('data-savead-id');
    });
}

/**
 *
 * @returns {Array}
 */
function getContentProducts() {
    var el = document.querySelectorAll('section.tabsContent  ul li a.list_item');
    elements =  Array.prototype.map.call(el, function(e) {
        var content = {};
        content['id'] = e.querySelector('div.saveAd').getAttribute('data-savead-id');

        if( e.querySelector('section h2')){
            content['title'] = e.getAttribute('title');
        }
        if( e.querySelector('.item_price')) {
            content['price'] = e.querySelector('.item_price').getAttribute('content');
        }
        if( e.querySelector('img')) {
            content['img'] = e.querySelector('img').getAttribute('src');
        } else {
            content['img'] = null;
        }

        if( e.querySelector('aside.item_absolute .item_supp')) {
            content['date_publish'] = e.querySelector('aside.item_absolute .item_supp').getAttribute('content');
        }

        content['link'] =  e.getAttribute('href');

        return content;
    });
    return elements;
}


















