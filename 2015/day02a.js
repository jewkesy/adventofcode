const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day02aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 1598415
  console.log("Puzzle Answer:", getWrappingPaperRequired(puzzleInput.split('\n')))
})

function getWrappingPaperRequired(arrSizes) {
	let paperSize = 0;
	for (let i = 0; i < arrSizes.length; i++) {
		var dimensions = arrSizes[i].split('x')

		// 2*l*w + 2*w*h + 2*h*l
		let face1 = +dimensions[0] * +dimensions[1]
		let face2 = +dimensions[1] * +dimensions[2]
		let face3 = +dimensions[2] * +dimensions[0]

		let prezzieSize = (face1*2) + (face2*2) + (face3*2)

		var findSmallest = Math.min(...[face1, face2, face3])

		paperSize = paperSize + prezzieSize + findSmallest
	}

	return paperSize;
}


const assert = require("assert")

assert(getWrappingPaperRequired(["2x3x4"]) == 58)
assert(getWrappingPaperRequired(["1x1x10"]) == 43)
assert(getWrappingPaperRequired(["2x3x4", "1x1x10"]) == 101)