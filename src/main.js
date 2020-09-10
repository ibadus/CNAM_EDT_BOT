const fs = require('fs');
const request = require('request');
const ical = require('ical')
const moment = require('moment')
const date = require('date')
const webhook = require('webhook-discord')
const {url1, url2, webhook1, webhook2} = require('./config.json');

var path_file1 = "/EDT/EDT1.ics"
var path_file2 = "/EDT/EDT2.ics"

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

const destinationGroupe1 = __dirname + path_file1;
const destinationGroupe2 = __dirname + path_file2;


download(url1, destinationGroupe1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

download(url2, destinationGroupe2, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});
console.log('Téléchargement terminé !');

// .ics parse + webhook PART
const ical_parser_sender = require('./ical.js')

var path_file1 = './EDT/EDT1.ics'
var path_file2 = './EDT/EDT2.ics'
try {
    ical_parser_sender.execute(fs, ical, webhook, date, moment, path_file1, webhook1);
    ical_parser_sender.execute(fs, ical, webhook, date, moment, path_file2, webhook2);    
} catch (err) {
    console.error(err)
}

// delete PART

const delete_file = require('./delete.js');

//delete_file.execute(fs, destinationGroupe1, destinationGroupe2);