var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3300));


app.get('/api/explanations', function (req, res) {
    var parser = require(__dirname + '/lib/explanations/parser');

    fs.readFile('./public/js/data.json', "utf-8", function (err, data) {
        if (err) throw err;

        var explanation = parser.parse(JSON.parse(data));
        explanation.setImpact(1);
        parser.calculateImpact(explanation);

        // TODO: calculate level

        console.log(util.inspect(explanation, {showHidden: false, depth: null}));

        res.json(JSON.parse(JSON.stringify(explanation, null, 4)));
    });
});



app.post('/api/explanations', function (req, res) {
    var parser = require(__dirname + '/lib/explanations/parser');
    var explanation = parser.parse(req.body);

    console.log(req.body);

    explanation.setImpact(1);
    parser.calculateImpact(explanation);

    res.json(JSON.parse(JSON.stringify(explanation, null, 4)));
});


app.get('/api/glossary', function (req, res) {
    var glossary = require(__dirname + '/lib/glossary/glossary');

    console.log(util.inspect(glossary, {showHidden: false, depth: null}));

    res.json(JSON.parse(JSON.stringify(glossary, null, 4)));
});



app.get('/submit/', function (req, res) {
    res.sendFile(__dirname + '/views/submit.html');
});



app.get('/', function (req, res) {
    res.redirect('/submit/');
   //res.sendFile(__dirname + '/views/index.html');
});




app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
