const fs = require('fs');
const request = require('request');
const {url1, url2, webhook} = require('./config.json');

function download(url, destination, cb) {
    const file = fs.createWriteStream(destination);

    const sendReq = request.get(url);

    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    sendReq.on('error', (err) => {
        fs.unlink(destination);
        cb(err.message);
    });

    sendReq.pipe(file);

    file.on('finish', () => {
        file.close(cb);
    });

    file.on('error', (err) => {
        fs.unlink(destination);
        cb(err.message);
    });
};

const destinationGroupe1 = __dirname + "/EDT/EDT1.ics";

download(url1, destinationGroupe1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

const destinationGroupe2 = __dirname + "/EDT/EDT2.ics";

download(url2, destinationGroupe2, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});
console.log('Téléchargement terminé !');





// DELET PART