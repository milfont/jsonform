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
feature('Car engine startup', function() {
  summary(
      'In order to populate my form',
      'As a user',
      'I want to press a button to populate'
  );
    
  scenario('The is stopped with the engine off', function() {
      var car;
      
      given('My car is parked and not running', function() {
        car = "teste";
      });
      when('I press the start button', function() {
        car = "teste";
      });
      then('The car should start up', function() {
        expect(car).toEqual("teste");
      });
  });
});

