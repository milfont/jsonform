describe("Get JSON with jsonform when select is multiple", function(){
    var lancamento;    
        
    beforeEach( function () {
        jQuery("body").html("");
        var template = __dirname + '/templates/multiple.html';
        var multiple = require('fs').readFileSync(template).toString();          
        jQuery(multiple).appendTo("body");
    });
    
    it('should have nested objects', function () {
        jQuery("[name='partidas[0].conta.codigo']").val(["1.01.0001", "1.02.0002"]);
        var json = jQuery("form[name='jsonform']").getJSON();
        var codigo = json.partidas[0].conta.codigo;                                
        expect(codigo).toEqual([ '1.01.0001', '1.02.0002' ]);
    });
	
	it('should have nested objects using method populate', function () {
        var obj = {
            partidas:[
                {conta:{codigo:['1.01.0001', '1.02.0002']} },
                {conta:{codigo:['1.03.0001', '1.03.0002']} }
            ]
        };
		
        var json = jQuery("form[name='jsonform']").populate(obj).getJSON();
		
		var codigo1 = json.partidas[0].conta.codigo;                                
		var codigo2 = json.partidas[1].conta.codigo;                                
        
        expect(codigo1).toEqual([ '1.01.0001', '1.02.0002' ]);
        expect(codigo2).toEqual([ '1.03.0001', '1.03.0002' ]);
    });

});