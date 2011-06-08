/*
http://digitalbush.com/2011/03/29/testing-jquery-plugins-with-node-js-and-jasmine/
*/

//fake browser window
global.window = require("jsdom")
                .jsdom()
                .createWindow();
global.jQuery = require("jquery").create(window);

//Test framework
var jasmine=require('jasmine-node');

//What we're testing
require(__dirname + "/lib/jsonform.js")

var isVerbose = true;
var showColors = true;

// files 
var fs = require('fs');
var template_path = __dirname + '/specs/template.html';

var template = fs.readFileSync(template_path).toString();

global["template"] = template;
jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){

	/*
	console.log("********");

    var specs = runner.specs();
    var specCount = 0;
    for (var i = 0; i < specs.length; i++) {
        console.log(specs[i].getFullName());
    }

    //console.log("Reporter: ", runner.suites_);
    console.log("Results ***********");
    var results = runner.results();
    for (var i = 0; i < results.items_.length; i++) {
    	var item = results.items_[i];
        console.log(item.items_[0].description);
    }
    
    
    console.log("Suites ***********");
    var suites = runner.suites();
    for (var i = 0; i < suites.length; i++) {
        var suite = suites[i];
            var results = suite.results();
            console.log("cade? ", results.items_);
            for (var i = 0; i < results.items_.length; i++) {
                var item = results.items_[i];
                console.log(item.description);
            }
    }*/
    
    process.exit(runner.results().failedCount?1:0);
}, isVerbose, showColors);
  
