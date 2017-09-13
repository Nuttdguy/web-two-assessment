
fetch("MOCK_DATA.csv").then(function (response) {
        return response.text(); // Convert the response into text format

    }).then(function (responseText) {

        // console.log(response); // log the response, check the content
        formatCsvFrom(responseText); // function that will format result

    }).catch(function(error) {
        console.log(error)
});

//===|| 001
function formatCsvFrom(responseText) {

    const userArr = constructArrayFrom(responseText, "\n");
    const userKeys = getKeyValuesFrom(userArr, ",");

    let userObj = [] // initialize array to hold user objects
    for (let idx = 1; idx < userArr.length; idx++) {

        let currentUserRow = userArr[idx].split(",");
        userObj.push(createUserObjectsFrom(currentUserRow, userKeys)); // for each key, call the method and pass in the current key
    }

    formatUserObjectFrom(userObj);
}

//===|| 002
function constructArrayFrom(responseText, deliminator) {
    return responseText.split(deliminator);
}

//===|| 003
function getKeyValuesFrom(userArr, deliminator) {
    return userArr[0].split(deliminator);
}

//===|| 004
function createUserObjectsFrom(currentUserRow, userKeys) {
    let userObj = { }

    for (let col = 0; col < currentUserRow.length; col++ ) {
        userObj[userKeys[col]] = currentUserRow[col];
    }
    return userObj;
}

//===|| 005
function formatUserObjectFrom(userObj) {
    let userFormattedArr = [];

    let userObjWithAddedKeys = addKeysTo(userObj); // add additional meta data "keys" to object

    for (let idx = 0; idx < userObjWithAddedKeys.length - 1; idx++) {
        let userRow = userObjWithAddedKeys[idx]; // Stores current row into a variable
        userFormattedArr.push(assignValuesTo(userRow));
    }
    console.log(userFormattedArr);
    return userFormattedArr;
}

//===|| 006
function addKeysTo(userObj) {

    for (let row = 0; row < userObj.length -1; row++) {
        // access object > object index > add key > then value
        userObj[row]['fullName'] = '';
        userObj[row]['rating2'] = 0;
    }
    return userObj;
}

//===|| 007
function assignValuesTo(userRow) {
    let tempObj = { } // Create an empty object to store key:value pairs

    for (let colDescription in userRow) {
        switch (colDescription) {
            case 'age':
                tempObj[colDescription] = Number.parseInt(userRow[colDescription]);
                break;
            case 'date':
                tempObj[colDescription] = formatDateTo(userRow[colDescription]);
                break;
            case 'id':
                tempObj[colDescription] = Number.parseInt(userRow[colDescription]);
                break;
            case 'rating':
                tempObj[colDescription] = Number.parseFloat(userRow[colDescription]);
                break;
            case 'rating2':
                tempObj[colDescription] = Number.parseFloat(userRow['rating']).toFixed(2).toString();
                break;
            case 'fullName':
                tempObj[colDescription] = userRow['prefix'] + ' ' + userRow['first_name'] + ' ' + userRow['last_name'];
                break;
            default:
                tempObj[colDescription] = userRow[colDescription];
                break;
        }
    }
    return tempObj;
}

//===|| 008
function formatDateTo(date) {
    let newDate = Number.parseInt(date); // format into number
    return new Date(newDate);
}

