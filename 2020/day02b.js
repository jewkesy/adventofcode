const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day02aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 670
  console.log("Puzzle Answer:", getValidPasswordsCount(puzzleInput.split('\n')))
})

function getValidPasswordsCount(arrPwds) {
	let validCount = 0;
	for (let i = 0; i < arrPwds.length; i++) {
		var item = arrPwds[i].split(' ')

		let range = item[0].split('-');
		let pos1 = +range[0];
		let pos2 = +range[1];

		let pattern = item[1].replace(':', '');
		let pwd = item[2];

		let letterAtPos1 = pwd.charAt(pos1-1);
		let letterAtPos2 = pwd.charAt(pos2-1);

		// if letter1 = a and letter2 = a, then invalid
		if (letterAtPos1 == pattern && letterAtPos2 == pattern) continue;
		// if letter1 != a and letter2 != a, then invalid
		if (letterAtPos1 != pattern && letterAtPos2 != pattern) continue;
		// if letter1 = a or letter2 = a, then valid
		if (letterAtPos1 == pattern || letterAtPos2 == pattern) validCount++
	}

	return validCount;
}

const assert = require("assert")

assert(getValidPasswordsCount(["1-3 a: abcde"]) == 1)
assert(getValidPasswordsCount(["1-3 b: cdefg"]) == 0)
assert(getValidPasswordsCount(["2-9 c: ccccccccc"]) == 0)
assert(getValidPasswordsCount(["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"]) == 1)
console.log("Tests Passed")