const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./inputs/day04aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 172
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

	var joinedArr = passport.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ');

	for (let i = 0; i < joinedArr.length; i++) {
		let item = joinedArr[i]
		var valid = validPart(item);
		if (!valid) return false;
	}
	return true;
}

function validPart(item) {
	if (item.indexOf("byr:") == 0) { //birth year
		item = item.replace('byr:', '')
		var isnum = /^\d+$/.test(item);
		if (!isnum) return false;
		if (+item < 1920 || +item > 2002) return false
	} else if (item.indexOf("iyr:") == 0) {
		item = item.replace('iyr:', '')
		var isnum = /^\d+$/.test(item);
		if (!isnum) return false;
		if (+item < 2010 || +item > 2020) return false
	} else if (item.indexOf("eyr:") == 0) {
		item = item.replace('eyr:', '')
		var isnum = /^\d+$/.test(item);
		if (!isnum) return false;
		if (+item < 2020 || +item > 2030) return false
	} else if (item.indexOf("hgt:") == 0) {
		item = item.replace('hgt:', '')
		var scale = item.slice(-2);
		var h = +item.replace(scale, '');
		if (scale == 'cm') {
			if (h < 150 || h > 193) return false
		} else if (scale == 'in') {
			if (h < 59 || h > 76) return false
		} else return false;
	} else if (item.indexOf("hcl:") == 0) {
		item = item.replace('hcl:', '')
		var hex = /^#[0-9A-F]{6}$/i.test(item)
		if (!hex) return false;
	} else if (item.indexOf("ecl:") == 0) {
		var eyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
		var idx = eyes.indexOf(item.replace('ecl:', ''))
		if (idx == -1) return false;
	} else if (item.indexOf("pid:") == 0) {
		item = item.replace('pid:', '')
		if (item.length != 9) return false;
		var isnum = /^\d+$/.test(item);
		if (!isnum) return false;
	}
	return true
}

const assert = require("assert")

var validSample = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`

assert(validPart("pid:087499704") == true)
assert(validPart("hgt:74in") == true)
assert(validPart("ecl:grn") == true)
assert(validPart("iyr:2012") == true)
assert(validPart("eyr:2030") == true)
assert(validPart("byr:1980") == true)
assert(validPart("hcl:#623a2f") == true)
assert(validPart("eyr:2029") == true)
assert(validPart("ecl:blu") == true)
assert(validPart("cid:129") == true)
assert(validPart("byr:1989") == true)
assert(validPart("iyr:2014") == true)
assert(validPart("pid:896056539") == true)
assert(validPart("hcl:#a97842") == true)
assert(validPart("hgt:165cm") == true)
assert(validPart("hcl:#888785") == true)
assert(validPart("hgt:164cm") == true)
assert(validPart("byr:2001") == true)
assert(validPart("iyr:2015") == true)
assert(validPart("cid:88") == true)
assert(validPart("pid:545766238") == true)
assert(validPart("ecl:hzl") == true)
assert(validPart("eyr:2022") == true)


assert(getValidPassportCount(validSample) == 4)

var invalidSample = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`

assert(validPart("eyr:1972") == false)
assert(validPart("pid:186cm") == false)
assert(validPart("eyr:1967") == false)
assert(validPart("hcl:dab227") == false)
assert(validPart("hgt:59cm") == false)
assert(validPart("ecl:zzz") == false)
assert(validPart("eyr:2038") == false)
assert(validPart("hcl:74454a") == false)
assert(validPart("iyr:2023") == false)
assert(validPart("pid:3556412378") == false)
assert(validPart("byr:2007") == false)

assert(getValidPassportCount(invalidSample) == 0)
console.log("Tests Passed")
