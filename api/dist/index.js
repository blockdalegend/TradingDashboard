"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_js_1 = require("@polygon.io/client-js");
var rest = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send("You're not supposed to be here!");
});
app.get('/stock/:ticker', function (req, res) {
    rest.reference.tickerDetails(req.params.ticker)
        .then(function (response) { return res.send(response); }).catch(function (e) {
        console.error('An error happened:', e);
    });
});
app.get('/stocknews/:ticker', function (req, res) {
    rest.reference.tickerNews({ ticker: req.params.ticker })
        .then(function (response) { return res.send(response); }).catch(function (e) {
        console.error('An error happened:', e);
    });
});
app.get('/options/:ticker', function (req, res) {
    rest.reference.optionsContracts({ underlying_ticker: req.params.ticker })
        .then(function (response) { return res.send(response.results); }).catch(function (e) {
        console.error('An error happened:', e);
    });
});
app.get('/options/:ticker/:type', function (req, res) {
    rest.reference.optionsContracts({ underlying_ticker: req.params.ticker, contract_type: req.params.type })
        .then(function (data) {
        if (data && data.results) {
            if (req.params.type === "all") {
                res.send(data.results);
            }
            else {
                // Assuming data.results is the array of objects and each object has a 'type' property
                var filteredData = data.results.filter(function (item) { return item.contract_type == req.params.type; });
                res.send(filteredData);
            }
        }
        else {
            res.status(500).send('Data is undefined');
        }
    });
});
app.get('/options/:type', function (req, res) {
    rest.reference.optionsContracts({ contract_type: req.params.type })
        .then(function (data) {
        if (data && data.results) {
            if (req.params.type == "all") {
                res.send(data.results);
            }
            else {
                // Assuming data.results is the array of objects and each object has a 'type' property
                var filteredData = data.results.filter(function (item) { return item.contract_type == req.params.type; });
                res.send(filteredData);
            }
        }
        else {
            res.status(500).send('Data is undefined');
        }
    });
});
app.get('/politiciandata', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) { return res.send(data); })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandata/:name', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.senator === req.params.name; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabyparty/:party', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.party === req.params.party; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabystate/:state', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.state === req.params.state; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabytransaction/:transaction', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.transaction === req.params.transaction; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabydate/:date', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.date === req.params.date; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabyticker/:ticker', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.ticker === req.params.ticker; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
app.get('/politiciandatabytype/:type', function (req, res) {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming data is an array of objects and each object has a 'name' property
        var filteredData = data.filter(function (item) { return item.type === req.params.type; });
        res.send(filteredData);
    })
        .catch(function (err) { return console.log(err); });
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT ".concat(port)); });
//# sourceMappingURL=index.js.map