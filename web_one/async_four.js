const fs = require('fs');
const file = process.argv[2]

// SOLUTION #1
// var myReadStream = fs.createReadStream(process.argv[2], 'utf8' );
//
// myReadStream.on('data', function(chunk) {
//     let line_count = 0;
//     let new_lines = chunk.split('\n') - 1;
//     for (let line in new_lines) {
//         console.log(line);
//         line_count++;
//     }
//     console.log(line_count);
// });

// SOLUTION << THEIRS
fs.readFile(file, 'utf8', function(err, data) {
    if(err) {
        return console.log(err);
    }
    let lines = data.split('\n').length - 1;
    console.log(lines);
})

