$(document).ready(function(){

  lancamento = {
    empresa: {id: 2, name: "Teste"},
    partidas: [
      {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"}, 
      {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
    ],
    description: "Teste", value: "125,67", date: "12/03/1999"
  };
  
  $('#jsonform').bind('submit', function() {

  	
    $(this).jsonform(lancamento, function(json) {
    	if(console) console.log("callback", json);
    });
  	
    return false;
  });
  
  jQuery("form[name='jsonform']").bind('submit', function() {

    
    $(this).populate(lancamento, true);
    
    return false;
  });

});