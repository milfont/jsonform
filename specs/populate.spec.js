var template =  "<form action='#' id='jsonform'> \
      <p>\
        <label for='empresa.id'>Empresa:</label> \
        <select id='empresa.id'> \
          <option value='1'>Milfont Consulting</option> \
          <option value='2'>TriadWorks</option> \
          <option value='3'>Caelum</option> \
        </select> \
      </p> \
      <p> \
        <label for='date'>Data:</label>  <input type='text' id='date' value='01/01/2011' /> \
      </p> \
      <p> \
        <label for='partidas[0].conta.codigo'>Débito:</label> \
          <select id='partidas[0].conta.codigo'> \
            <option value='1.01.0001'>Caixa</option> \
            <option value='1.02.0001'>Banco</option> \
            <option value='1.02.0002'>Compras</option> \
          </select> \
          </input>  \
          <input type='text'     id='partidas[0].conta.nome' /> \
          <input type='hidden'   id='partidas[0].natureza' value='1' /> \
          <input type='text'   id='partidas[0].nesteds[0].nested' /> \
          <input type='text'   id='partidas[0].nesteds[1].nested' /> \
      </p> \
      <p> \
        <label for='partidas[1].conta.codigo'>Crédito:</label> \
          <select id='partidas[1].conta.codigo'> \
            <option value='1.01.0001'>Caixa</option> \
            <option value='1.02.0001'>Banco</option> \
            <option value='1.02.0002'>Compras</option> \
          </select> \
          </input>  \
          <input type='text'   id='partidas[1].conta.nome' /> \
          <input type='hidden' id='partidas[1].natureza' value='-1' /> \
          <input type='text'   id='partidas[1].nesteds[0].nested' /> \
          <input type='text'   id='partidas[1].nesteds[1].nested' /> \
      </p> \
      <p> \
        <label for='description'>Descrição:</label> <textarea id='description'></textarea> \
      </p>  \
      <p> \
        <label for='value'>Valor:</label> <input type='text' id='value' /> \
      </p> \
      <p> \
        <input type='submit' id='submit'/> \
      </p> \
    </form>";
jQuery(template).appendTo("body");

var lancamento;

describe('Populate',function(){
    
  beforeEach(function () {
    
    Object.defineProperty(Object.prototype, "toJSON()", {
      enumerable: false, value: function() {
        
      }
    });
    
    lancamento = {
      empresa: {id: 2, name: "Teste"},
      partidas: [
        {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"}, 
        {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
      ],
      description: "Teste",
      value: "125,67",
      date: "12/03/1999"
    };
  });

  it('when exists nested objects', function () {
    jQuery('#jsonform').jsonform(lancamento, function(json) {      
      expect(jQuery("#partidas\\[0\\]\\.conta\\.codigo").val().toString()).toEqual("1.02.0002");
    });
  });

});




console.log("jasmine.grammar", jasmine.grammar);

/*
https://github.com/rudylattae/jasmine-species/raw/master/src/jasmine-species/jasmine-grammar.js
*/
feature('Car engine startup', function() {
    summary(
        'In order to drive my car around',
        'As a vehicle owner',
        'I want to press a button to start my car'
    );
    
    scenario('The is stopped with the engine off', function() {
        var car;
        
        given('My car is parked and not running', function() {
            car = "teste";
        });
        when('I press the start button', function() {
            
        });
        then('The car should start up', function() {

        });
    });
});

