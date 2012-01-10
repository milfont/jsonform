## Build
[![Build Status](https://secure.travis-ci.org/milfont/jsonform.png)](http://travis-ci.org/milfont/jsonform)

## Example: by ID
```javascript
var byID = true;
var json = $('#form_id').getJSON( byID );
```

## Example: default
```javascript
var json = $("#form_id").getJSON();
```

## Example: by ID for legacy code
```javascript
var lancamento = {
    empresa: {id: 2, name: "Teste"},
    partidas: [
        {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
        {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
    ],
    description: "Teste",
    value: "125,67",
    date: "12/03/1999"
};
var byID = true;
$('#form_id').populate( lancamento, byID );
```

## Example: by name [default]
```javascript
var lancamento = {
    empresa: {id: 2, name: "Teste"},
    partidas: [
        {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
        {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
    ],
    description: "Teste",
    value: "125,67",
    date: "12/03/1999"
};
$("[name='form_name'").populate(lancamento);
```

## Testing in console
```javascript
var script = document.createElement('script');
script.onload = function() {
   var jsonFormScript = document.createElement("script");
   //source version
   jsonFormScript.src = "https://raw.github.com/milfont/jsonform/master/lib/jsonform.js";
   //minified version
   //jsonFormScript.src = "https://raw.github.com/milfont/jsonform/master/minified/jsonform.min.js";
  document.body.appendChild(jsonFormScript);
};
script.src = "https://raw.github.com/milfont/jsonform/master/vendor/jquery-1.7.1.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
```

## Running Tests:
```shell
Install nodejs and npm https://github.com/joyent/node/wiki/Installation
git clone git://github.com/milfont/jsonform.git
cd jsonform
npm install 
sudo chmod 777 testrunner
./testrunner
```

***
### Contributors:

 * [Josh Minnich] (https://github.com/joshmosh)
 * [Alberto Leal] (https://github.com/albertoleal)
 * [Abraão Alves] (https://github.com/AbraaoAlves)
 * [Christiano Milfont] (https://github.com/cmilfont)