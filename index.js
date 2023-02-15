const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db');
const port = process.env.PORT;

app.use(bodyParser.json());

try {
    app.post('/data', (req, res) => {
        const data = req.body;
        connection.query('INSERT INTO mytable SET ?', data, function (error, results) {
            if (error) throw error;
            res.send({
                status: 200,
                result: results
            });
        });
    });

    app.get('/data', (req, res) => {
        connection.query('SELECT * FROM mytable', function (error, results) {
            if (error) throw error;
            res.send({
                status: 200,
                result: results
            });
        });
    });

    app.get('/data/:id', (req, res) => {
        const id = req.params.id;
        connection.query('SELECT * FROM mytable WHERE id = ?', id, (error, results) => {
            if (error) throw error;
            res.send({
                status: 200,
                result: results[0]
            });
        });
    });

    app.put('/data/:id', (req, res) => {
        const id = req.params.id;
        const user = req.body;
        connection.query('UPDATE mytable SET ? WHERE id = ?', [user, id], (error, results) => {
            if (error) throw error;
            res.send({
                status: 200,
                result: results
            });
        });
    });

    app.delete('/data/:id', (req, res) => {
        const id = req.params.id;
        connection.query('DELETE FROM mytable WHERE id = ?', id, (error, results) => {
            if (error) throw error;
            res.send({
                status: 200,
                result: results
            });
        });
    });

} catch (error) {
    res.send({
        status: 500,
        Message: "Internal Server Error"
    })
}

app.listen(port, function () {
    console.log('Server started on port ' + port);
});