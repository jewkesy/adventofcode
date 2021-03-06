const fs = require("fs")
const readline = require('readline');
var console = require('tracer').colorConsole();
const assert = require("assert")

const right = 3;
const down = 1;

var trees = 0;
getRoute(getSlope('./day03aTestInput.txt', 3), 0, 0);
// getRoute(getSlope('./input.txt', 40), 0, 0);
console.log("Answer", trees)  //205
assert(trees == 7)

function getRoute(slope, x, y) {
	console.log('Getting route', x, y)

	if (!slope[y+down]) return

	var cell = slope[y+down][x+right];
	if (cell == '#') trees++

	getRoute(slope, x+right, y+down)
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

    console.log(slope.length)
    return slope;
}
