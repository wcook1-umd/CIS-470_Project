const interpret_bf = require('./bf_interpreter.js')

const fs = require('node:fs');

if (process.argv.length >= 3 && process.argv[1].includes("app.js")) {
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
}