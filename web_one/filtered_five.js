const fs = require('fs');
const path = require('path');
// const dir = process.argv[2];
// const ext = process.argv[3];

// SOLUTION # 1
// fs.readdir(dir, function(error, data) {
//     if (error) { throw error }
//
//     data.map(function(data) {
//         return data;
//     }).filter(function(data) {
//         if (data.slice(data.length - 2) === ext) {
//             return data;
//         }
//     }).forEach(function(data) {
//         if (data !== ext) {
//             console.log(data);
//         };
//     });
// });

// SOLUTION >> THEIRS
var folder = process.argv[2];
var ext = '.' + process.argv[3];

fs.readdir(folder, function(err, files) {
    if (err) return console.log(err);

    files.forEach(function(file) {
        if(path.extname(file) === ext) {
            console.log(file);
        }
    })
});


