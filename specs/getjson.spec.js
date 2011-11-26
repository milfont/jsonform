describe("Get JSON with jsonform ", function(){
		var lancamento;    
		
		beforeEach( function () {
        jQuery("body").html("");
        lancamento = {
            empresa: {id: 2, name: "Teste"},
            partidas: [
                {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
                {conta: {codigo:"1.01.0001", nome: "Banco"},   natureza: "-1"}
            ],
            description: "Teste",
            value: "125,67",
            date: "12/03/1999"
        };
    });
    
    describe('when have id property', function() {
    
        beforeEach( function () {
            jQuery(global["template"]).appendTo("body");
       });
    
        it('should have nested object using "getJSON method"', function () {
            var byId = true;
            var codigo = jQuery('#jsonform').populate(lancamento, byId)
                                            .getJSON(byId).partidas[0].conta.codigo;
            expect(codigo).toEqual("1.02.0002");
        });

        it('should have nested objects with suffix', function () {
            var byId = true;
            var json = jQuery("#jsonform").populate(lancamento, byId)
                                            .getJSON({suffix:"_attributes", byId: byId});
            expect(json.partidas_attributes).toBeTruthy();
        });
        
    });
    
    
    describe('when have name property', function() {
    
        beforeEach( function () {
            jQuery(global["templateWithName"]).appendTo("body");
        });
    
        it('should have nested objects', function () {
            var codigo = jQuery("form[name='jsonform']").populate(lancamento)
                                            .getJSON().partidas[0].conta.codigo;
            expect(codigo).toEqual("1.02.0002");
        });
    
    });

    describe('when need prefix in nested property', function() {
    
        beforeEach( function () {
            jQuery(global["templateWithName"]).appendTo("body");
        });
    
        it('should have nested objects with suffix', function () {
            var json = jQuery("form[name='jsonform']").populate(lancamento)
                                            .getJSON({suffix:"_attributes"});
            expect(json.partidas_attributes).toBeTruthy();
        });

        it('should have nested objects with prefix', function () {
            var json = jQuery("form[name='jsonform']").populate(lancamento)
                                            .getJSON({prefix:"attributes_"});
            expect(json.attributes_partidas).toBeTruthy();
        });

    });


    describe('when have an input without name property', function() {
    
        beforeEach( function () {
            jQuery(global["templateWithName"]).appendTo("body");
        });
    
        it('should not have property with empty name', function () {
            var json = jQuery("form[name='jsonform']").populate(lancamento).getJSON();
            var emptyName = false;
            for(var name in json) {
                if(name === '') emptyName = true;
            }
            expect(emptyName).toBeFalsy();
        });
    
    });

});