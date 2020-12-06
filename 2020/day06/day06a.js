const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 6521
  console.log("Puzzle Answer:", getPeepSum(puzzleInput))
})

function getPeepSum(input) {
	let groups = input.split('\n\n');
	let totalAns = 0
	for (let i = 0; i < groups.length; i++) {
		var group = groups[i].split('\n')
		var answers = new Set();
		for (let j = 0; j < group.length; j++) {
			let peepAns = group[j].split('');
			for (let k = 0; k < peepAns.length; k++) {
				answers.add(peepAns[k])
			}
		}
		totalAns += answers.size;
	}
	return totalAns
}

const assert = require("assert")

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

assert(getPeepSum(example) == 11)

let sampleMini = `gyrf
idg`

assert(getPeepSum(sampleMini) == 6)