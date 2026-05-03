const express = require('express');
const serverless = require('serverless-http');
const fs = require('node:fs');
const interpret_bf = require('./src/bf_interpreter.js')

if (process.argv.length >= 3 && process.argv[1].includes("index.js")) {
    let fileName = process.argv[2];

    let inp = "";
    if (process.argv.length >= 4)
        inp = process.argv[3];

    let prog = "";
    try {
        prog = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.log(process.argv)
        console.error(err);
    }

    console.log(interpret_bf(prog, inp))

} else {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.get('/default/CIS470-Project', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    })

    app.post('/default/interpret', (req, res) => {
        const { code: code, input: input } = req.body;
        const output = interpret_bf(code, input);
        res.json({ output: output });
    })

    module.exports.handler = serverless(app);
}