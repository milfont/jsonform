describe("Get JSON with jsonform ", function(){
    var lancamento;
    
    describe('when have id property', function() {
    
        beforeEach( function () {
            jQuery("body").html("");
            jQuery(global["template"]).appendTo("body");
            lancamento = {
                empresa: {id: 2, name: "Teste"},
                partidas: [
                    {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
                    {conta: {codigo:"1.02.0001", nome: "Banco"},   natureza: "-1"}
                ],
                description: "Teste",
                value: "125,67",
                date: "12/03/1999"
            };
        });
    
        it('should have nested object using "getJSON method"', function () {
            var byId = true;
            var codigo = jQuery('#jsonform').populate(lancamento, byId)
                                            .getJSON(byId).partidas[0].conta.codigo;
            expect(codigo).toEqual("1.02.0002");
        });
        
    });
    
    
    describe('when have name property', function() {
    
        beforeEach( function () {
            jQuery("body").html("");
            jQuery(global["templateWithName"]).appendTo("body");
            lancamento = {
                empresa: {id: 2, name: "Teste"},
                partidas: [
                    {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"},
                    {conta: {codigo:"1.01.0001", nome: "Caixa"}, natureza: "1"}
                ],
                description: "Teste",
                value: "47,32",
                date: "12/03/1999"
            };
        });
    
        it('should have nested objects', function () {
            var codigo = jQuery("form[name='jsonform']").populate(lancamento)
                                            .getJSON().partidas[0].conta.codigo;
            expect(codigo).toEqual("1.02.0001");
        });
    
    });

    describe('when have an input without name property', function() {
    
        beforeEach( function () {
            jQuery("body").html("");
            jQuery(global["templateWithName"]).appendTo("body");
            jQuery("textarea[name='description']").attr("name", "");
            lancamento = {
                empresa: {id: 2, name: "Teste"},
                partidas: [
                    {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"},
                    {conta: {codigo:"1.01.0001", nome: "Caixa"}, natureza: "1"}
                ],
                description: "Teste",
                value: "47,32",
                date: "12/03/1999"
            };
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