
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
    for (let idx = 1; idx < userArr.length - 1; idx++) {
        let currentUserRow = userArr[idx].split(",");
        // console.log(currentUserRow);
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
    const userObj = { }

    for (let col = 0; col < currentUserRow.length - 1; col++ ) {
        userObj[userKeys[col]] = currentUserRow[col];
    }
    return userObj;
}

//===|| 005
function formatUserObjectFrom(userObj) {
    let userFormattedArr = [];
    let userObjWithAddedKeys = addKeysTo(userObj); // add additional meta data "keys" to object

    let isShuffleIdentity = true; // switch to activate shuffling of user identity
    let isShuffleCount = 0;
    let firstNameArr = [];
    let lastNameArr = [];
    const keyId = 'first_name';
    const keyId2 = 'last_name';


    for (let idx = 0; idx < userObjWithAddedKeys.length; idx++) {
        let userRow = {};

        if ( isShuffleIdentity ) {
            while (isShuffleCount != 1 ) {
                firstNameArr = shuffle(userObjWithAddedKeys, keyId);
                lastNameArr = shuffle(userObjWithAddedKeys, keyId2);
                isShuffleCount++;
            }
            userRow = userObjWithAddedKeys[idx];
            userFormattedArr.push( assignValuesTo( userRow, firstNameArr, lastNameArr, isShuffleIdentity) );
        } else {
            userRow = userObjWithAddedKeys[idx]; // Stores current row into a variable; use sequential indexing
            userFormattedArr.push( assignValuesTo(userRow, "", "", false) );
        }

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

//===|| 007  ==// ADD GENERATION AND CONSTRUCTION OF EMAIL
function assignValuesTo(userRow, firstNameArr, lastNameArr, isShuffleIdentity) {
    let tempObj = { } // Create an empty object to store key:value pairs
    let firstNameIdx = 0;
    let lastNameIdx = 0;

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
            case 'first_name':
                firstNameIdx = randomIndexGenerator(firstNameArr.length); // to ensure same index/first name is assigned to fullname key
                tempObj[colDescription] = (isShuffleIdentity) ? firstNameArr[firstNameIdx] : userRow[colDescription];
                break;
            case 'last_name':
                lastNameIdx = randomIndexGenerator(lastNameArr.length); // to ensure same index/first name is assigned to fullname key
                tempObj[colDescription] = (isShuffleIdentity) ? lastNameArr[lastNameIdx] : userRow[colDescription];
                break;
            case 'fullName':
                tempObj[colDescription] = (isShuffleIdentity) ? firstNameArr[firstNameIdx] + ' ' + lastNameArr[lastNameIdx] :
                    userRow['prefix'] + ' ' + userRow['first_name'] + ' ' + userRow['last_name'];
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

//===|| Extra # 4  >> IMPROVE TO PREVENT DUPLICATE
function shuffle(userObjWithAddedKeys, keyId) {
    let shuffledIdentityArr = [];

    for (let key in userObjWithAddedKeys ) {
        shuffledIdentityArr.push(userObjWithAddedKeys[randomIndexGenerator(userObjWithAddedKeys.length)][keyId]);
    }
    return shuffledIdentityArr;

}

//===|| 009 >> NOT WORKING, CHANGE TO GENERATE EMAIL BY FIRST-NAME AND LAST-NAME
function matchEmailTo(firstNameArr, lastNameArr, keyId3, userObjWithAddedKeys) {
    let matchedValueArr = [];
    let out = 0;
    let out2 = 0;
    let out3 = 0;

    RESET: for (let nameIdx = 0; nameIdx < firstNameArr.length; nameIdx++ ) {
        out++;
         for (let keyIdx in userObjWithAddedKeys[nameIdx]) {
             //console.log(keyIdx); // this is key index of the object - we don't need all of the keys, only first name AND last name
             // console.log(userObjWithAddedKeys[nameIdx]['first_name'] + '  ==  ' +  firstNameArr[nameIdx]);
            if (userObjWithAddedKeys[nameIdx]['first_name'] === firstNameArr[nameIdx] ) {
                matchedValueArr.push(userObjWithAddedKeys[keyId3]);
                // console.log(nameIdx + ' ==== ' + userObjWithAddedKeys[keyId3] + "  ========  " + firstNameArr[nameIdx] + "  ========  " )
                out3++;
                continue RESET;
            }
            out2++;
        }
    }
    console.log(out);
    console.log(out2);
    console.log(out3);

    console.log(matchedValueArr);
    return matchedValueArr;
}

//===||  00010
function randomIndexGenerator(max) {
    return Math.floor(Math.random() * max);
}

//===||  0011  >>  Extra # 5
function generateHtml(userObject) {
    const o_ul = '<ul>', e_ul = '</ul>';
    const o_li = '<li>', e_li = '</li>';
    let html = '';

    for (let user in userObject) {
        html += o_ul + user['first_name'] + e_ul;
    }


}


// Problem 4
// Imagine you need to subvert democracy by creating fake names that can be submitted as valid voters. Write a function that generates new random users from the data in the original list by mixing and matching values. The idea is to generate random users from the provided user data.

//     Problem 5
// Write a function to describe a user. This should return an HTML block that displays a user. Include the name, gender, date, and rating.

//     Problem 6
// Define a JavaScript Class that represents a User. This class should have all of the properties list along with some new methods.
// Include the description method from Problem 5 above.
//     Include a method to return the date property formatted as Month, Day, Year.

//     Problem 7
// Write function to check the data Object for duplicate names, where the first name and last are the same. You can add some rows to the data that include matching names for testing.
//

//     Problem 8
// Write a function that returns names that are similar. This is open ended – you should describe your criteria for determining what makes names similar.

