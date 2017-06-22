var elements = [];
var links;
var linkToGrubPage = null;
var countPage =1;

var utils = require('utils');
var fs = require('fs');
var parseDay = true;

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
   //  verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  true,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var url = casper.cli.args[0];

logF = fs.open('results/ali/log.txt','w');
casper.on('log', function(entry) {
    logF.writeLine(new Date() + '---' + entry.message);
    logF.flush();
});

casper.start(url, function() {
    this.scrollToBottom();
});



casper.then(grubPage);


casper.run(function () {
    logF.close();
    this.exit();
});


function grubPage(){


 /*   if (linkToGrubPage !== null) {
        casper.thenOpen(linkToGrubPage, function () {
            this.scrollToBottom();
        });
    }*/


//www.leboncoin.fr/voitures/offres/ile_de_france/?o=2&f=p

    casper.viewport(1920, 1080);
    casper.then(function() {


        this.log('---' + countPage + '///////*********linkToGrubPage:  ----' + linkToGrubPage);

        casper.wait(3000, function() {
            casper.waitForSelector('img', function() {
                // casper.capture('results/bot/screenshots/step1.png');
            });
        });
    });
    casper.viewport(1920, 1080);
    casper.then(function() {
        /*casper.capture('results/bot/screenshots/step1.png');*/
        links = this.evaluate(getContentProducts);

      //  linkToGrubPage = 'https:' + this.evaluate(getNextPage);



        this.echo(casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, links));

        ids = this.evaluate(getId);
        this.echo(casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, ids));
    });

    casper.then(function(){

     //   this.log('///////*********PARSE LINK TO NEXT PAGE:' + linkToGrubPage, 'info');

        var save =  casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, links);

        this.log('///////*********SAVE:' + save, 'info');
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
        countPage++;

    });

    /*
     casper.then(function () {
     casper.capture('results/bot/screenshots/step2.png');
     });
     */
/*
    casper.then(function () {

        this.log('///////*********NEXT NEXT NEXT NEXT NEXT NEXT:' + linkToGrubPage, 'info');
        if (parseDay) {
            this.log('///////*********parse day true:', 'info');
            if (linkToGrubPage.length > 12) {
                casper.wait(2500, function () {
                    casper.then(grubPage);
                });
            }
        }
    });*/
}


/**
 * get next page link
 * @returns {string}
 */
function getNextPage(){
    return document.querySelector('div.pagination_links_container .selected').nextElementSibling.getAttribute('href');
}

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

        if( e.querySelector('aside.item_absolute .item_supp')) {

            if ((new Date()).toISOString().substring(0, 10) == e.querySelector('aside.item_absolute .item_supp').getAttribute('content')){

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

            } else {
                parseDay = false;
            }
        }

        return content;
    });
    return elements;
}





































var elements = [];
var links;
var linkToGrubPage = null;
var countPage =1;

var utils = require('utils');
var fs = require('fs');
var parseDay = true;

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    verbose: false,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  true,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var url = casper.cli.args[0];



casper.start(url, function() {
    this.scrollToBottom();
});

logF = fs.open('results/ali/log.txt','w');
casper.on('log', function(entry) {
    logF.writeLine(new Date() + '---' + entry.message);
    logF.flush();
});

casper.then(grubPage);


casper.run(function () {
    logF.close();
    this.exit();
});


function grubPage(){


    /*   if (linkToGrubPage !== null) {
     casper.thenOpen(linkToGrubPage, function () {
     this.scrollToBottom();
     });
     }*/


//www.leboncoin.fr/voitures/offres/ile_de_france/?o=2&f=p

    casper.viewport(1920, 1080);

    casper.then(function () {
        casper.capture('results/bot/screenshots/step1.png');
    });

    casper.then(function() {

        casper.wait(1000, function() {
            //  casper.waitForSelector('img', function() {
            casper.capture('results/bot/screenshots/step2.png');
            //   });
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
        countPage++;

    });

    /*
     casper.then(function () {
     casper.capture('results/bot/screenshots/step2.png');
     });
     */

    /*casper.then(function () {
     if (parseDay) {
     linkToGrubPage = 'https:' + this.evaluate(getNextPage);
     if (linkToGrubPage.length > 12) {
     casper.wait(2500, function () {
     casper.then(grubPage);
     });
     }
     }
     });*/
}


/**
 * get next page link
 * @returns {string}
 */
function getNextPage(){
    return document.querySelector('div.pagination_links_container .selected').nextElementSibling.getAttribute('href');
}

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

        if( e.querySelector('aside.item_absolute .item_supp')) {

            if ((new Date()).toISOString().substring(0, 10) == e.querySelector('aside.item_absolute .item_supp').getAttribute('content')){

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

            } else {
                parseDay = false;
            }
        }

        return content;
    });
    return elements;
}
































