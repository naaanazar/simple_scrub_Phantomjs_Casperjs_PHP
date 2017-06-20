
var utils = require('utils');
var fs = require('fs');

var casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  false,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var ids = JSON.parse(casper.cli.args[0]);

console.log(Array.isArray(ids));

casper.start();

casper.viewport(1920, 1080);

casper.then(function() {
    casper.each(ids, function (self, id, i) {
        casper.echo( id );

        casper.wait(300, function() {

            casper.then(function() {
                casper.thenOpen('https://www.leboncoin.fr/ar/form/0?ca=12_s&id=' + id, function () {
                });
            });
            casper.then(function () {
                this.fillSelectors('form#adreply_form', {
                'input[name="name"]':    'Nazar',
                'input[name="email"]':    'nazar.k.php@gmail.com',
                'input[name="phone"]':   '0299568959',
                'textarea[name="body"]':       'Good car',
                'input[name="cc"]':         1
                }, true);
            });
        });
    });
});

casper.run(function () {
    this.exit();
});




















