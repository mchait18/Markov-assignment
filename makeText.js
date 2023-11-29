/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

const type = process.argv[2]
if (type === 'file') makeText(process.argv[3])
else if (type === 'url') makeURLText(process.argv[3])
else {
    console.error(`Unknown method: ${type}`);
    process.exit(1);
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1)
        }
        outputData(data, path)
    })
}

async function makeURLText(url) {
    try {
        let res = await axios.get(url)
        outputData(res.data, "")
    }
    catch (error) {
        console.error(`Error fetching ${url}: ${error}`)
        process.exit(1)
    }
}

function outputData(data, path) {
    let mm = new MarkovMachine(data);
    let text = mm.makeText()
    console.log(`...generated text from ${type} ${path} ${text}`)
}