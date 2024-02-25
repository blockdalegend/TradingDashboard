import express from 'express'
import { restClient } from '@polygon.io/client-js';
const rest = restClient(process.env.POLYGON_API_KEY);
const app = express();

app.get('/', (req, res) => {
  res.send("You're not supposed to be here!");
});

app.get('/stock/:ticker', (req, res) => {
    rest.reference.tickerDetails(req.params.ticker)
        .then(response => res.send(response)).catch(e => {
        console.error('An error happened:', e);
    });
});

app.get('/stocknews/:ticker', (req, res) => {
    rest.reference.tickerNews({ ticker: req.params.ticker })
        .then(response => res.send(response)).catch(e => {
        console.error('An error happened:', e);
    });
});

app.get('/options/:ticker', (req, res) => {
    rest.reference.optionsContracts({ underlying_ticker: req.params.ticker })
        .then(response => res.send(response.results)).catch(e => {
        console.error('An error happened:', e);
    });
});

app.get('/options/:ticker/:type', (req, res) => {
    rest.reference.optionsContracts({ underlying_ticker: req.params.ticker, contract_type: req.params.type })
    .then(data => {
        if (data && data.results) {
            if (req.params.type === "all") {
                res.send(data.results);
            } else {
                // Assuming data.results is the array of objects and each object has a 'type' property
                const filteredData = data.results.filter((item:any) => item.contract_type == req.params.type);
                res.send(filteredData);
            }
        } else {
            res.status(500).send('Data is undefined');
        }
    })
});

app.get('/options/:type', (req, res) => {
    rest.reference.optionsContracts({ contract_type: req.params.type})
    .then(data => {
        if (data && data.results) {
            if (req.params.type == "all") {
                res.send(data.results);
            } else {
                // Assuming data.results is the array of objects and each object has a 'type' property
                const filteredData = data.results.filter((item:any) => item.contract_type == req.params.type);
                res.send(filteredData);
            }
        } else {
            res.status(500).send('Data is undefined');
        }
    })
});

app.get('/politiciandata', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.get('/politiciandata/:name', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item:any) => item.senator === req.params.name);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabyparty/:party', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item:any) => item.party === req.params.party);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabystate/:state', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item:any) => item.state === req.params.state);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabytransaction/:transaction', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item:any) => item.transaction === req.params.transaction);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabydate/:date', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item:any) => item.date === req.params.date);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabyticker/:ticker', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item: any) => item.ticker === req.params.ticker);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

app.get('/politiciandatabytype/:type', (req, res) => {
    fetch('https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of objects and each object has a 'name' property
        const filteredData = data.filter((item: any) => item.type === req.params.type);
        res.send(filteredData);
    })
    .catch(err => console.log(err));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));