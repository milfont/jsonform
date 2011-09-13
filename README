## Example:
```javascript
$('#form_id').getJSON(true);
```

## Example:
```javascript
$("[name='formname']").getJSON();
```

## Example: with ID for legacy code
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
    $('#form_id').populate(lancamento, true);
```

```javascript
## Example: with name [default]
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

Running Tests:
    Install nodejs and npm https://github.com/joyent/node/wiki/Installation
    git clone git://github.com/milfont/jsonform.git
    cd jsonform
    npm install 
    sudo chmod 777 testrunner
    ./testrunner