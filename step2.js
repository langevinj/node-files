const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(`${path}`, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try{
        let resp = await axios.get(`${url}`)
        console.log(resp.data)
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
    
}

if (process.argv[2].startsWith('http')){
    webCat(process.argv[2])
} else {
    cat(process.argv[2])
}


