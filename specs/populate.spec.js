var lancamento, template, templateWithName;

var fs = require('fs'),
    templatePath         = __dirname + '/template.html',
    templateWithNamePath = __dirname + '/template.with.name.html';
    
template         = fs.readFileSync(templatePath).toString();
templateWithName = fs.readFileSync(templateWithNamePath).toString();

describe('Populate with jsonform when have id property', function() {

    beforeEach( function () {
        jQuery("body").html("");
        jQuery(template).appendTo("body");
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

    it('should populate nested objects using "populate method"', function () {
        var byName = true;
        jQuery('#jsonform').populate(lancamento, byName);
        expect(jQuery("#partidas\\[0\\]\\.conta\\.codigo").val().toString()).toEqual("1.02.0002");
    });

});


describe('Populate with jsonform when have name property', function() {

    beforeEach( function () {
        jQuery("body").html("");
        jQuery(templateWithName).appendTo("body");
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

    it('should populate nested objects', function () {
        jQuery("form[name='jsonform']").populate(lancamento);
        var value = jQuery("[name='partidas\\[0\\]\\.conta\\.codigo']").val().toString();
        expect(value).toEqual("1.02.0001");
    });

    it('should populate zero values', function () {
        lancamento.value = 0;
        jQuery("form[name='jsonform']").populate(lancamento);
        var value = jQuery("[name='value']").val().toString();
        expect(value).toEqual("0");
    });

});

