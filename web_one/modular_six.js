const filter = require('./module');

const directory = process.argv[2];
const filterExt = process.argv[3];

filter(directory, filterExt, function(err, data){
    if (err !== null) { console.log(err) }

    if (data !== null) {
        data.forEach(function(data) {
            console.log(data);
        });
    }
});


// THEIR SOLUTION
// var filterFn = require('./solution_filter.js');
// var dir = process.argv[2];
// var filterStr = process[3];
//
// filterFn(dir, filterStr, function(err, list) {
//     if (err) {
//         return console.error('There was an error:', err)
//     }
//
//     list.forEach(function(file) {
//         console.log(file);
//     })
//
// });
//
