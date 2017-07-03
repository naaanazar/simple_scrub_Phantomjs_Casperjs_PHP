var serverUrl = 'http://parser:8080'

var elements = [];
var links;
var linkToGrubPage = null;
var countPage =1;

var utils = require('utils');
var fs = require('fs');
var parseDay = true;

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
     //verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  true,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

//var urlSite = casper.cli.args[0];
var urlSite = 'https://www.leboncoin.fr/voitures/offres/ile_de_france/?f=p';


casper.start();

logF = fs.open('results/log.txt','w');
casper.on('log', function(entry) {
    logF.writeLine(new Date() + '---' +countPage + '---' + entry.message);
    logF.flush();
});

casper.then(grubPage);


casper.run(function () {
    this.exit();
});




function grubPage(){

    if (linkToGrubPage !== null) {
        casper.thenOpen(linkToGrubPage, function () {
            this.scrollToBottom();
        });
    } else {
        casper.thenOpen(urlSite, function () {
            casper.scrollToBottom();

        });

        casper.then(function() {
            casper.wait(12000, function(){
                casper.capture('results/screenshots/step3.png');
            })
        });
    }

//www.leboncoin.fr/voitures/offres/ile_de_france/?o=2&f=p

   // casper.viewport(1920, 1080);
    casper.then(function() {
        casper.wait(12000, function() {
           // casper.waitForSelector('img', function() {
                 casper.capture('results/screenshots/page_' + countPage + '.png');
         //   });
        });
    });
    casper.viewport(1920, 1080);
    casper.then(function() {
        this.log('///////*********START SCRUB PAGE:' + countPage, 'info');
        /*casper.capture('results/bot/screenshots/step1.png');*/
        links = this.evaluate(getContentProducts);
        this.echo(casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, links));

        linkToGrubPage = 'https:' + this.evaluate(getNextPage);
        this.log('///////*********PARSE PAGE:' + linkToGrubPage, 'info');

        ids = this.evaluate(getId);
        this.echo(casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, ids));

        this.log('///////*********PARSE RESULTS:' + ids, 'info');

        var dates = this.evaluate(getDate);

        casper.each(dates, function (self, date, i) {

            this.log('///////*********DATES: ' + i + '----' + date, 'info');
            this.log('///////*********TODAY' +(new Date()).toISOString().substring(0, 10), 'info');

            if ((new Date()).toISOString().substring(0, 10) != date){
                parseDay = false;
            }
        });
    });

    casper.then(function(){



        var save =  casper.evaluate(function (myObject) {
            return JSON.stringify(myObject);
        }, links);

        var fs = require('fs');
        fs.write('myFile.json', casper.evaluate(function(myObject ) {
            return JSON.stringify(myObject);
        }, save), 'w');


        this.open('http://parser:8000/save.php', {
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


    casper.then(function () {
        this.log('///////*********FLAG:' + parseDay, 'info');
        if(parseDay === true) {
            if (linkToGrubPage.length > 12) {
                casper.wait(1000, function () {
                    casper.then(grubPage);
                });
            }
        }
    });
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
 * @returns {*}
 */
function getDate() {
    var date = document.querySelectorAll('aside.item_absolute p.item_supp');
    return Array.prototype.map.call(date, function(e) {
        return e.getAttribute('content');
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

            }
        }

        return content;
    });
    return elements;
}


















