
var utils = require('utils');
var fs = require('fs');

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    //verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  false,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var id = casper.cli.args[0];



casper.start();

logF = fs.open('results/massage_log.txt','aw');
casper.on('log', function(entry) {
    logF.writeLine(new Date() + '---' + id + '---' + entry.message);
    logF.flush();
});

casper.viewport(1920, 1080);

casper.then(function() {
    this.log('///////*********PARSE RESULTS:' + id, 'info');
        casper.echo( id );
        casper.wait(300, function() {
            casper.then(function() {
                casper.thenOpen('https://www.leboncoin.fr/ar/form/0?ca=12_s&id=' + id, function () {
                });
            });
            casper.then(function () {

                /*casper.capture('results/screenmasssage/m2_' + id + '.png');*/

                this.fillSelectors('form#adreply_form', {
                'input[name="name"]':    'Nazar',
                'input[name="email"]':    'naaa@ukr.net',
                'input[name="phone"]':   '0299568959',
                'textarea[name="body"]':       'Good car',
                'input[name="cc"]':         1
                }, true);

               // casper.capture('results/screenmasssage/m1_' + id + '.png');
            });
        });
});

casper.then(function() {
    casper.wait(1000, function () {
       //casper.capture('results/screenmasssage/m2_' + id + '.png');
    });
});

casper.run(function () {
    this.exit();
});




















