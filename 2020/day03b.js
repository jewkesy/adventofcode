const fs = require("fs")
const readline = require('readline');
var console = require('tracer').colorConsole();

var file = './inputs/day03aInput.txt'; // Answer: 3952146825
// var file = './inputs/day03aTestInput.txt'; // Answer: 336
var repeatTimes = 400
let trees = 0;


let treeArr = []
treeArr.push(getRoute(getSlope(file, repeatTimes), 0, 0, 1, 1));
treeArr.push(getRoute(getSlope(file, repeatTimes), 0, 0, 3, 1));
treeArr.push(getRoute(getSlope(file, repeatTimes), 0, 0, 5, 1));
treeArr.push(getRoute(getSlope(file, repeatTimes), 0, 0, 7, 1));
treeArr.push(getRoute(getSlope(file, repeatTimes), 0, 0, 1, 2));

console.log(treeArr)

let answer = 1;
for (let i = 0; i < treeArr.length; i++) {
    answer = (answer * treeArr[i])
}
console.log(answer)

function getRoute(slope, x, y, right, down) {
    if (x == 0 && y == 0) trees = 0;
	// console.log('Getting route', x, y)

	if (!slope[y+down]) return trees
	var cell = slope[y+down][x+right];
	if (cell == '#') trees++

	getRoute(slope, x+right, y+down, right, down)
    return trees
}

function getSlope(pathToFile, repeat) {
	let slope = [];
    const data = fs.readFileSync(pathToFile, 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
    	
    	var combined = "";
    	for (let i = 0; i < repeat; i++) {
    		combined += line;
    	}
    	var row = combined.split('')
    	slope.push(row)
    });

    return slope;
}
