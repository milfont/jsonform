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
//require(__dirname + "/lib/jsonform.js")
require(__dirname + "/minified/jsonform.min.js")

// Templates 
var fs = require('fs');
var templatePath = __dirname + '/specs/template.html';
var templateWithNamePath = __dirname + '/specs/template.with.name.html';

var template = fs.readFileSync(templatePath).toString();
var templateWithName = fs.readFileSync(templateWithNamePath).toString();

global["template"] = template;
global["templateWithName"] = templateWithName;

var isVerbose = true;
var showColors = true;
jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){    
    process.exit(runner.results().failedCount?1:0);
}, isVerbose, showColors);
  
