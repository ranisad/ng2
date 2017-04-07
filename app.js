const express = require('express');
const app = express();
global.__base = __dirname;
global.config = require(__base + '/config.js');

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const logger = require(__base + '/server/logger/logger').Logger;

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressLayouts);
app.use('/', express.static(__base + config.urls.staticDir));
app.use('/dist', express.static(__base + config.urls.distDir));
app.use('/node_modules', express.static(__base + config.urls.extLibsDir))
app.use('/app', express.static(__base + config.urls.appDir))


logger.initialize();

app.use('/', require(__base + '/server/routing/page-routing'));
app.use('/api', require(__base + '/server/routing/api-routing'));

// Handle 404
app.use(function (req, res) {
    if (req.xhr) {
        res.status(404).json('404: Page not Found');
    } else {
        res.status(404).send('404: Page not Found');
    }
});

// Handle 500
app.use(function (error, req, res, next) {
    if (req.xhr) {
        res.status(500).json('500: Internal Server Error' + error);
    } else {
        res.status(500).send('500: Internal Server Error' + error);
    }
    next();
});

process.on('uncaughtException', function (err) {
    console.log(err);
})

app.listen(3000, function () {
    console.log('running on port 3000');
});
