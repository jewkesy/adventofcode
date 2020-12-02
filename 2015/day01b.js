const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day01aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("Puzzle Answer:", getFloor(puzzleInput))
})


const assert = require("assert")

assert(getFloor(")") == 1)
assert(getFloor("()())") == 5)

function getFloor(instructions) {
	var split = instructions.split('');
	// console.log(split)

	let position = 0

	for (let i = 0; i < split.length; i++) {
		var c = split[i];
		if (c == "(") position++;
		else if (c == ")") position--;

		if (position == -1) {
			return i+1;
		}
	}
	throw new Error('Exception message');
}