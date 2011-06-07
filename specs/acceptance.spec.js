//console.log("jasmine", jasmine);

describe("", function(){
  it("", function(){});
});

var _addStepToCurrentSpec = function(desc, func) {
  var spec = jasmine.getEnv().currentSpec;
  spec.details = spec.details || [];
  spec.details.push(desc);
  spec.runs(func);
  return spec;
}
feature = function(description, specDefinitions) {
  var suite = jasmine.getEnv().describe('Feature: ' + description, specDefinitions);
  suite.tags = ['feature'];
  return suite;
};
scenario = function(desc, func) {
  //var suite = jasmine.getEnv().describe('Scenario: ' + desc, func);
  //return suite;
  _addStepToCurrentSpec("Scenario " + desc, func);
};
summary = function() {
  var suite = jasmine.getEnv().currentSuite;
  suite.summary = suite.summary || [];
  if (arguments.length > 0) {
      for(i=0; i<arguments.length; i++) {
          suite.summary.push(arguments[i]);
      }
  }
};
given = function(desc, func){
  _addStepToCurrentSpec("Given " + desc, func);
};
when  = function(desc, func){
  _addStepToCurrentSpec("When " + desc, func);
};
then  = function(desc, func){
  _addStepToCurrentSpec("Then " + desc, func);
};



/*
https://github.com/rudylattae/jasmine-species/raw/master/src/jasmine-species/jasmine-grammar.js
*/
feature('Using jQuery plugin to populate form', function() {
  summary(
      'In order to submit my form',
      'As a user',
      'I want populate a form with json'
  );
  scenario('The is stopped with the engine off', function() {
      var object;
      given('json object', function() {
        object = {
            nested: {id: 2, name: "Teste"},
            array_nested: [
              {nested: {id: 3, name: "Teste"} }
            ],
            description: "Teste",
            value: "125,67",
            date: "12/03/1999"
          };
        });
      and('form html', function() {
        var template =  "<form action='#' id='jsonform'> \
        ...\
        </form>";
        jQuery(template).appendTo("body");
      });
      when('I press the start button', function() {
        jQuery('#jsonform').jsonform(object);
      });
      then('The car should start up', function() {
        expect(jQuery(query).val().toString()).toEqual("Teste");
      });
  });
});

