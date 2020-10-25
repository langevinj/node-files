const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path, to_write) {
    if(!to_write){
        fs.readFile(`${path}`, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            } else {
                console.log(data)
            }
        });
    } else {
        let content = fs.readFileSync(`${path}`, "utf8");
        write_file(content)
    }
}

function write_file(content){
    fs.writeFile(`${process.argv[3]}`, content, 'utf8', function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

async function webCat(url, to_write) {
    let resp;
    try {
        resp = await axios.get(`${url}`)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }

    if (!to_write) {
        console.log(resp.data)
    } else {
        let content = resp.data;
        write_file(content);
    }
}

if(process.argv[4]){
    if(process.argv[2] == "--out"){
        if (process.argv[4].startsWith('http')){
            webCat(process.argv[4], true)
        } else {
            cat(process.argv[4], true);;
        }
    }
} else {
    if (process.argv[2].startsWith('http')){
        webCat(process.argv[2], false);
    } else {
        cat(process.argv[2], false);
    }
}
