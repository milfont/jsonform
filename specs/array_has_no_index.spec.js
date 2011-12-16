describe("Get JSON with jsonform when array has no index", function(){
    var lancamento;    
        
    beforeEach( function () {
        jQuery("body").html("");
        var template = __dirname + '/templates/array_has_no_index.html';
        var multiple = require('fs').readFileSync(template).toString()          
        jQuery(multiple).appendTo("body");
    });
    
    it('should have nested objects', function () {
        jQuery("[name='partidas[].conta.codigo']").val(["1.01.0001", "1.02.0002"]);
        var json = jQuery("form[name='jsonform']").getJSON();
        
        
        console.log("json ", json);
        
        var codigo = json.partidas[0].conta.codigo;                                
        expect(codigo).toEqual([ '1.01.0001', '1.02.0002' ]);
    });

});