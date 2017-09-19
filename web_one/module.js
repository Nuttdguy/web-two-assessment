const fs = require('fs');
const path = require('path');


function filter(directory, filterExt, callback){
    fs.readdir(directory, function(err, data) {
        if (err) return callback(err, null);

        stuff = [];
        data.forEach(function(data){
            if(path.extname(data) === "." + filterExt ) {
                    stuff.push(data);
                }
            });
        callback(err, stuff);
    })
};

module.exports = filter;

// THEIR SOLUTION
// var fs = require('fs');
// var path = require('path');
//
// module.exports = function(dir, filterStr, callback) {
//     fs.readdir(dir, function(err, list) {
//         if (err) {
//             return callback(err)
//         }
//
//         list = list.filter(function(file) {
//             return path.extname(file) === '.' + filterStr;
//         })
//
//         callback(null, list)
//     })
// };

