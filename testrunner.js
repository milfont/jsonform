var testrunner = require( "qunit" );
testrunner.run({
	deps: ".test/env.js",
  code: "./lib/jsonform.js", 
  tests:"./test/tests.js"
});