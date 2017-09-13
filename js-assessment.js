
fetch("MOCK_DATA.csv").then(function (response) {
        return response.text(); // Convert the response into text format

    }).then(function (responseText) {

        // console.log(response); // log the response, check the content
        formatCsv(responseText); // function that will format result

    }).catch(function(error) {
        console.log(error)
});

function formatCsv(responseText) {

    const userArr = getFormattedResponse(responseText, "\n");
    const userKeys = getKeyValues(userArr, ",");

    let userObj = [] // initialize array to hold user objects
    for (let idx = 1; idx < userArr.length; idx++) {

        let currentUserRow = userArr[idx].split(",");
        userObj.push(createUserObj(currentUserRow, userKeys)); // for each key, call the method and pass in the current key
    }

    // create another function to format data
    // console.log(userObj.length);
    formatUserObj(userObj);
    // console.log(userObj);

}

function getFormattedResponse(responseText, deliminator) {
    return responseText.split(deliminator);
}

function getKeyValues(userArr, deliminator) {
    return userArr[0].split(deliminator);
}

function createUserObj(currentUserRow, userKeys) {
    let userObj = { }

    for (let col = 0; col < currentUserRow.length; col++ ) {
        userObj[userKeys[col]] = currentUserRow[col];
    }

    return userObj;
}

function formatUserObj(userObj) {
    let userFormattedArr = [];

    // input == string >> output to correct format || 1001 objects in an array
    for (let idx = 0; idx < userObj.length; idx++) {

        let row = userObj[idx]; // Stores current row into a variable
        let tempObj = {}; // Create an empty object to store key:value pairs

        for (let description in row) {
            switch (description) {
                case 'age':
                    tempObj[description] = Number.parseInt(row[description]);
                    break;
                case 'date':
                    tempObj[description] = formatDate(row[description]);
                    break;
                case 'id':
                    tempObj[description] = Number.parseInt(row[description]);
                    break;
                case 'rating':
                    tempObj[description] = Number.parseFloat(row[description]);
                    break;
                default:
                    tempObj[description] = row[description];
                    break;
            }
        }
        userFormattedArr.push(tempObj);
    }
    console.log(userFormattedArr);
    return userFormattedArr;
}

function formatDate(date) {
    let newDate = Number.parseInt(date); // format into number
    return new Date(newDate);
}

