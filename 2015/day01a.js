const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day01aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // 74
  console.log("Puzzle Answer:", getFloor(puzzleInput))
})

function getFloor(instructions) {
	var split = instructions.split('');

	let position = 0

	for (let i = 0; i < split.length; i++) {
		var c = split[i];
		if (c == "(") position++;
		else if (c == ")") position--;
	}
	return position
}

const assert = require("assert")

assert(getFloor("") == 0)
assert(getFloor("(())") == 0)
assert(getFloor("()()") == 0)

assert(getFloor("(((") == 3)
assert(getFloor("(()(()(") == 3)
assert(getFloor("))(((((") == 3)

assert(getFloor("())") == -1)
assert(getFloor("))(") == -1)

assert(getFloor(")))") == -3)
assert(getFloor(")())())") == -3)
