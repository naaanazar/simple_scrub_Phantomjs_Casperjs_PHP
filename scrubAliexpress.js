/**
 * Created by naaanazar on 14.06.2017.
 */
//aliexpress

var linkToGrubPage = null;
var countPage =1;

var utils = require('utils');
var fs = require('fs');


casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
   // verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        //  loadImages:  false,        // do not load images
        loadPlugins: false         // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

casper.start('https://www.aliexpress.com/wholesale?ltype=wholesale&d=y&origin=y&isViewCP=y&catId=0&initiative_id=SB_20170614053251&SearchText=fg&blanktest=0&tc=af');

/**
 * save logs to file
 */
logF = fs.open('results/ali/log.txt','aw');
casper.on('log', function(entry) {
    logF.writeLine(new Date() + '---' + entry.message);
    logF.flush();
});

casper.then(grubPage);

casper.run(function () {
    logF.close();
    this.exit();
});




/**
 * grub page and if exist next page run again
 */
function grubPage(){
    casper.echo('///*******START PAGE# ' + countPage + '********' +  linkToGrubPage);
    this.log('///////*********START PAGE# ' + countPage + '*********///////////', 'info');
    this.log('///////*********PARSE PAGE:' + linkToGrubPage, 'info');

    if (linkToGrubPage !== null) {
        casper.thenOpen(linkToGrubPage, function () {
        });
    }

    casper.then(function () {
        casper.capture('results/ali/screenshots/crub_' + countPage + '.png');
    });

    casper.then(function () {
        var results = this.evaluate(getContentProducts);

        casper.then(function () {
            casper.each(results, function (self, link, i) {
                this.log('///////*********RESULTS: ' + i + '----' + link.img, 'info');

                stream = fs.open('results/ali/csv/res.csv','aw');
                stream.writeLine('"' + link.page_link + '","' + link.page_link_name + '","' + link.price + '","' + link.order + '","' + link.img + '"');
                stream.flush();
                stream.close();
            });
        });

        countPage++;
    });

    casper.then(function () {
        linkToGrubPage = 'https:' + this.evaluate(getNextPage);
        if(linkToGrubPage.length > 12) {
            casper.wait(2500, function() {
                casper.then(grubPage);
            });
        }
    });
}

/**
 * get next page link
 * @returns {string}
 */
function getNextPage(){
    return document.querySelector('.ui-pagination-active').nextElementSibling.getAttribute('href');
}


/**
 * parse page and get array with product objects in page
 * @returns {*}
 */
function getContentProducts() {
    var el = document.querySelectorAll('li.list-item');
    elements =  Array.prototype.map.call(el, function(e) {
        //  console.log($(e).find('.history-item').attr('href'));
        var content = {};
        var link  = (e).querySelector('h3 a.history-item');

        var imgLink  = (e).querySelector('img.picCore');

        var price  = (e).querySelector('div.info span.price span.value');

        var order  = (e).querySelector('a.order-num-a em');

        console.log(price.textContent);

        content['page_link'] = link.getAttribute('href');
        content['page_link_name'] = link.textContent;

        if ((e).querySelector('img').getAttribute('image-src')){
            content['img'] = imgLink.getAttribute('image-src');
        }
        if ((e).querySelector('img').getAttribute('src')){
            content['img'] = imgLink.getAttribute('src');
        }
        content['price'] = price.textContent;
        content['order'] = order.textContent;

        return content;
    });

    return elements;
}















