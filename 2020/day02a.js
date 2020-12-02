const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day02aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 666
  console.log("Puzzle Answer:", getValidPasswordsCount(puzzleInput.split('\n')))
})

function getValidPasswordsCount(arrPwds) {

	let validCount = 0;
	for (let i = 0; i < arrPwds.length; i++) {
		var item = arrPwds[i].split(' ')

		let range = item[0].split('-');
		let min = +range[0];
		let max = +range[1];

		let pattern = item[1].replace(':', '');
		let pwd = item[2];

		var letterCount = (pwd.match(new RegExp(pattern, "g")) || []).length;

		if (letterCount >= min && letterCount <= max) validCount++;
	}

	return validCount;
}


const assert = require("assert")

assert(getValidPasswordsCount(["1-3 a: abcde"]) == 1)
assert(getValidPasswordsCount(["1-3 b: cdefg"]) == 0)
assert(getValidPasswordsCount(["2-9 c: ccccccccc"]) == 1)
assert(getValidPasswordsCount(["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"]) == 2)
console.log("Tests Passed")