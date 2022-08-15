//getting values from the command line
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}
let arr = args[0].toUpperCase();
let str = args[1].toUpperCase();

//converting a string to a one-dimensional array
function strToArr(srng) {
    return srng.split('');
}

//convert string to 2-dimensional array
function arrToMultiDimArr(arr, size) {
    var newArray = [];

    while (arr.length > 0) {
        newArray.push(arr.slice(0, size));
        arr = arr.slice(size);
    }
    return newArray;
}

//search for an element in the top adjacent cell
function moveUp(arr, pos, smb) {
    let s = '';
    const a = pos[0];
    const b = pos[1];

    if (a == 0) {
        return s;
    } else {
        (arr[a - 1][b] === smb) ? s = [a - 1, b]: '';
    }
    return s;
}

//search for an element in the bottom adjacent cell
function moveDown(arr, pos, smb) {
    let s = '';
    const a = pos[0];
    const b = pos[1];

    if (a == arr.length - 1) {
        return s;
    } else {
        (arr[a + 1][b] === smb) ? s = [a + 1, b]: '';
    }
    return s;
}

//search for an element in the left adjacent cell
function moveLeft(arr, pos, smb) {
    let s = '';
    const a = pos[0];
    const b = pos[1];

    if (b == 0) {
        return s;
    } else {
        (arr[a][b - 1] === smb) ? s = [a, b - 1]: '';
    }
    return s;
}

//search for an element in the right adjacent cell
function moveRigth(arr, pos, smb) {
    let s = '';
    const a = pos[0];
    const b = pos[1];

    if (b == arr.length - 1) {
        return '';
    } else {
        (arr[a][b + 1] === smb) ? s = [a, b + 1]: '';
    }
    return s;
}

//a function that searches in one iteration in a certain order (top, bottom, left, right)
function searchSmb(moveUp, moveDown, moveLeft, moveRigth, arr, pos, smb) {
    let up = moveUp(arr, pos, smb);
    if (up != '') return up;

    let down = moveDown(arr, pos, smb);
    if (down != '') return down;

    let left = moveLeft(arr, pos, smb);
    if (left != '') return left;

    let rigth = moveRigth(arr, pos, smb);
    if (rigth != '') return rigth;

    console.error("Didn't find the word!");
    process.exit(1);
}

//a function that looks for the position of the first character
function findFirstSmb(arr1, arr2) {
    let s = '';
    let firdtSmb = arr2[0];

    for (var row = 0; row < arr1.length; row++) {
        let posCol = arr1[row].indexOf(firdtSmb);

        if (posCol >= 0) {
            s = [row, posCol];
            break;
        }
    }

    if (s == '') {
        console.error("Didn't find the word!");
        process.exit(1);
    } else return s;
}

//a function that searches for all character positions
function getAllPosSmb(arr1, arr2, firstPos) {

    let s = [firstPos];
    let tmp = firstPos;

    for (var i = 1; i < arr2.length; i++) {
        tmp = searchSmb(moveUp, moveDown, moveLeft, moveRigth, arr1, tmp, arr2[i]);

        s.push(tmp);
    }

    return s;
}

//function to display cells on the screen
function show(s) {
    let str = '';
    for (var i = 0; i < s.length; i++) {

        if (i == s.length - 1) {
            str = str + "[" + s[i].join() + "]";
            break;
        }
        str = str + "[" + s[i].join() + "]->";
        tmpArr = [];
    }
    return console.log(str);
}

arr = strToArr(arr);
let size = Math.sqrt(arr.length);
arr = arrToMultiDimArr(arr, size);
console.table(arr);

str = strToArr(str);
console.log(str);

let firstElem = findFirstSmb(arr, str);

let allPos = getAllPosSmb(arr, str, firstElem);

show(allPos);