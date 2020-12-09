const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 7409241
  console.log("Puzzle Answer:", getAnswer(puzzleInput.split('\n').map( x=> +x), 57195069))
})

function getAnswer(input, target) {
	let found = false
	let preamble = []
	let l = 0
	while(!found) {
		preamble = input.slice(0, l)
		found = hasSum(target, preamble)
		l++
		if (input.length == preamble.length || preamble.reduce((a, b) => a + b, 0) > target) {
			l = 0
			input.shift();
		}
		if (input.length == 0) break;
	}

	let min = Math.min(...preamble);
	let max = Math.max(...preamble);
	console.info(min, max, min+max)

	return min+max
}

function hasSum(sum, arrValues) {
	if (arrValues.reduce((a, b) => a + b, 0) > sum) return false;
	if (arrValues.reduce((a, b) => a + b, 0) == sum) return true;
	return false
}

const assert = require("assert")

let example1 = `15
25
47
40`
assert(hasSum(127, example1.split('\n').map( x=> +x)) == true)

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

assert(getAnswer(example.split('\n').map( x=> +x), 127) == 62)
