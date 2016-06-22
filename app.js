var express = require ('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser =require('body-parser');
var models = require('./models');
var routes = require('./routes/wiki');
var path = require('path');

app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files have it use swig
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'/public')));


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.use('/wiki',routes);

