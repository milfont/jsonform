describe("Get JSON with jsonform when array has no index", function(){
    var lancamento;    
        
    beforeEach( function () {
        jQuery("body").html("");
        var template = __dirname + '/templates/array_has_no_index.html';
        var multiple = require('fs').readFileSync(template).toString();          
        jQuery(multiple).appendTo("body");
    });
    
    it('should have nested objects', function () {
        jQuery("[name='partidas[].conta.codigo']:first").val(["1.01.0001", "1.02.0002"]);
        var json = jQuery("form[name='jsonform']").getJSON();
        var codigo = json.partidas[0].conta.codigo;                                
        expect(codigo).toEqual([ '1.01.0001', '1.02.0002' ]);
    });
	
	 it('should have nested objects with many selects', function () {
        jQuery("[name='partidas[].conta.codigo']").eq(0).val(["1.01.0001", "1.02.0002"]);
        jQuery("[name='partidas[].conta.codigo']").eq(1).val(["1.03.0001", "1.03.0002"]);
        
        var json = jQuery("form[name='jsonform']").getJSON();
        
        var codigoDaContaDaPartida1 = json.partidas[0].conta.codigo;                                
        var codigoDaContaDaPartida2 = json.partidas[1].conta.codigo;                                
        
        expect(codigoDaContaDaPartida1).toEqual([ '1.01.0001', '1.02.0002' ]);
        expect(codigoDaContaDaPartida2).toEqual([ '1.03.0001', '1.03.0002' ]);
    });

    it('should have nested objects with many selects (using populate)', function () {
        var obj = {
            partidas:[
                {conta:{codigo:['1.01.0001', '1.02.0002']} },
                {conta:{codigo:['1.03.0001', '1.03.0002']} }
            ]
        };
        
        var json = jQuery("form[name='jsonform']").populate(obj).getJSON();
        
        var codigoDaContaDaPartida1 = json.partidas[0].conta.codigo;                                
        var codigoDaContaDaPartida2 = json.partidas[1].conta.codigo;                                
        
        expect(codigoDaContaDaPartida1).toEqual([ '1.01.0001', '1.02.0002' ]);
        expect(codigoDaContaDaPartida2).toEqual([ '1.03.0001', '1.03.0002' ]);
    });
});