const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 57195069
  console.log("Puzzle Answer:", getNonSum(puzzleInput.split('\n').map( x=> +x), 25))
})

function getNonSum(input, preambleSize) {
	let found = false

	while(!found) {
		var preamble = input.slice(0, preambleSize)
		var tofind = input[preambleSize];
		var sum = hasSum(tofind, preamble)
		if (!sum) return tofind
		input.shift();
	}
	return -1
}

function hasSum(sum, arrValues) {
	for (var i = 0; i < arrValues.length-1; i++) {
		var first = arrValues[i];
		for (var j = i+1; j < arrValues.length; j++) {
			var second = arrValues[j];
			if (first + second == sum) return true;
		}	
	}
	return false
}

const assert = require("assert")

let example = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

assert(getNonSum(example.split('\n').map( x=> +x), 5) == 127)
