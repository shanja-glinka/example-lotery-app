const express = require('express');

const path = require('path');

const app = express();


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/:filename', function (req, res) {
    try {
        res.sendFile(path.join(__dirname + '/public/' + req.params.filename));
    }
    catch { }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
