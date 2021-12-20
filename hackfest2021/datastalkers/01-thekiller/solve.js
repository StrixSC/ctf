const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const converter = require('json-2-csv');

const valid_ids = [
    8, 144, 233, 2, 5, 3,
    21, 377, 89, 0, 34, 13,
    610, 1, 55
];

const valid_data = [];

const solve = () => {
    fs.createReadStream('filename.csv')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            if(valid_ids.includes(parseInt(row.citizen_id, 10))) {
                valid_data.push(row);
            }
        })
        .on('end', rowCount => {
            converter.json2csv(valid_data, (err, csv) => {
                if (err) {
                    throw err;
                }
                
                fs.writeFileSync('./valid.csv', csv);
            });
        });
}

solve();