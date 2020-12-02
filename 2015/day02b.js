const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day02aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 3812909
  console.log("Puzzle Answer:", getRibbonLengthRequired(puzzleInput.split('\n')))
})

function getRibbonLengthRequired(arrSizes) {
	let ribbonSize = 0;
	for (let i = 0; i < arrSizes.length; i++) {
		var dimensions = arrSizes[i].split('x').map(function(item) {
		    return parseInt(item, 10);
		});
		dimensions.sort(function(a, b) {
		  return a - b;
		});

		let ribbonWrap = (dimensions[0]*2) + (dimensions[1]*2)
		let ribbonBow = dimensions[0] * dimensions[1] * dimensions[2]

		ribbonSize = ribbonSize + ribbonWrap + ribbonBow
	}

	return ribbonSize;
}


const assert = require("assert")

assert(getRibbonLengthRequired(["2x3x4"]) == 34)
assert(getRibbonLengthRequired(["1x1x10"]) == 14)
assert(getRibbonLengthRequired(["2x3x4", "1x1x10"]) == 48)
console.log("Tests Passed")