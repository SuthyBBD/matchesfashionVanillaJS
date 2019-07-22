const fs = require('fs');
const readline = require('readline');

function userInput() {
    var file = process.argv[2];
    return file;
}

function input() {
    var file = userInput();

    var str = fs.readFileSync(file).toString();
    return solve(str);
}

function solve(str) {

    const wordMap = [];
    str.match(/[a-z']+/i) !== null ? str.match(/[a-z']+/gi).map(function (word) {
        word = word.toLowerCase();
        wordMap[word] > 0 ? wordMap[word] += 1 : wordMap[word] = 1;
    }) : [];

    const maxObj = {max1: {num: 0, word: ""}, max2: {num: 0, word: ""}, max3: {num: 0, word: ""}};

    Object.keys(wordMap).forEach(function (a) {
        if (wordMap[a] > maxObj.max1.num) {
            maxObj.max3 = maxObj.max2;
            maxObj.max2 = maxObj.max1;
            maxObj.max1 = {num: wordMap[a], word: a};
        } else if (wordMap[a] > maxObj.max2.num) {
            maxObj.max3 = maxObj.max2;
            maxObj.max2 = {num: wordMap[a], word: a};
        }
        else if (wordMap[a] > maxObj.max3.num) {
            maxObj.max3 = {num: wordMap[a], word: a}
        }
    });


    function output(maxObj) {
        if (maxObj.max1.num !== 0 && maxObj.max2.num !== 0 && maxObj.max3.num !== 0) {
            return [maxObj.max1.word, maxObj.max2.word, maxObj.max3.word];
        } else if (maxObj.max1.num !== 0 && maxObj.max2.num !== 0) {
            return [maxObj.max1.word, maxObj.max2.word];
        } else if (maxObj.max1.num !== 0) {
            return [maxObj.max1.word];

        }
        return [];
    }


    return output(maxObj);

}

console.log(input());