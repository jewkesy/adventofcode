const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day04aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 237
  console.log("Puzzle Answer:", getValidPassportCount(puzzleInput))
})

function getValidPassportCount(input) {
	var entries = input.split('\n\n');
	var validPassports = [];
	// console.log(entries.length)
	for (let i = 0; i < entries.length; i++) {
		let entry = entries[i];
		let isValid = isValidPassport(entry)
		if (isValid) validPassports.push(entry);
	}

	return validPassports.length
}


function isValidPassport(passport) {

	if (passport.indexOf("byr:") == -1) return false;
	if (passport.indexOf("iyr:") == -1) return false;
	if (passport.indexOf("eyr:") == -1) return false;
	if (passport.indexOf("hgt:") == -1) return false;
	if (passport.indexOf("hcl:") == -1) return false;
	if (passport.indexOf("ecl:") == -1) return false;
	if (passport.indexOf("pid:") == -1) return false;
	// if (passport.indexOf("cid:") == -1) return false;
	return true;
}


const assert = require("assert")

var sample = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

assert(getValidPassportCount(sample) == 2)
console.log("Tests Passed")