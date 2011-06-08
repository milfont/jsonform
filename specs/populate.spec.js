
    
jQuery(global["template"]).appendTo("body");

var lancamento;

describe('Populate with jsonform', function() {

    beforeEach( function () {
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
    
    it('should exists nested objects', function () {
        jQuery('#jsonform').jsonform(lancamento, function(json) {
            expect(jQuery("#partidas\\[0\\]\\.conta\\.codigo").val().toString()).toEqual("1.02.0002");
        });
    });
    
    it('should exists nested objects 2', function () {
        jQuery('#jsonform').jsonform(lancamento, function(json) {
            expect(jQuery("#partidas\\[0\\]\\.conta\\.codigo").val().toString()).toEqual("1.02.0002");
        });
    });
    
});