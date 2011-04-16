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

//Dependencies
require(__dirname + "/jasmine-grammar.js");

for(var key in jasmine) {
  global[key] = jasmine[key];
}

//What we're testing
require(__dirname + "/lib/jsonform.js")

jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){
    process.exit(runner.results().failedCount?1:0);
}, true, true);