var fs = require('fs');
const argv = process.argv;


// a synchronous file stream
var file_contents = fs.readFileSync(argv[2], { 'encoding': 'utf8' });

function count_new_lines(file_contents) {
    let arr = file_contents.split('\n');
    let new_line_count = -1;
    for (let item in arr) {
        new_line_count++;
    }
    console.log(new_line_count);
    return new_line_count;
}

count_new_lines(file_contents);


// a synchronous file stream - their solution
var contents = fs.readFileSync(process.argv[2]);
var lines = contents.toString().split('\n').length - 1;
console.log(lines);


// An asynchronous file stream
// var myReadStream = fs.createReadStream('voyage.txt');
//
// myReadStream.on('data', function(chunk) {
//     console.log('new chunk received');
//     console.log(chunk);
// });



