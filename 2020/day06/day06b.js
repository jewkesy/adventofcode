const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 3305
  console.log("Puzzle Answer:", getPeepSum(puzzleInput))
})

function getPeepSum(input) {
	let groups = input.split('\n\n');
	let totalAns = 0
	for (let i = 0; i < groups.length; i++) {
		var group = groups[i].split('\n')
		var answers = [];
		for (let j = 0; j < group.length; j++) {
			var g = group[j].split('')
			answers = answers.concat(g);
		}
		// console.info(answers, group.length)

		for (let k = 0; k < group.length; k++) {
			var g = group[k].split('');
			for (let m = 0; m < g.length; m++) {
				var count = countOccurrences(answers, g[m])
				if (count == group.length) {
					totalAns++;

					var index = answers.indexOf(g[m]);
					if (index !== -1) {
					  answers.splice(index, 1);
					}
				}
			}
		}
	}
	return totalAns
}

function countOccurrences(arrSource, letter) {
	var inline = arrSource.join('')
	var count = inline.split(letter).length - 1
	return count
}

const assert = require("assert")


assert(getPeepSum('abc') == 3)
assert(getPeepSum('b') == 1)

assert(getPeepSum(`a
a
a
a`) == 1)


let example = `abc

a
b
c

ab
ac

a
a
a
a

b`

assert(getPeepSum(example) == 6)

let sampleMini = `gyrf
idg`

assert(getPeepSum(sampleMini) == 1)
