const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 1000
  console.log("Puzzle Answer:", getAcc(puzzleInput))
})

let acc = 0;
function getAcc(instructions) {
	instructions = instructions.split('\n');
	instructions.unshift("nop +0")
	// console.log(instructions)
	var changedIdx = 1;
	var changedOriginal = "";
	var changedBecame = "";

	for (var i = 0; i < instructions.length; i++) {
		var ins = instructions;
		acc = 0
		// console.log(ins)
		if (tryRoute(ins)) {
			return acc;
		} else {
			var tweak = findNextIdx(changedIdx + 1, instructions);
			if (changedIdx > 1) {
				instructions[changedIdx] = instructions[changedIdx].replace(changedBecame, changedOriginal)
			}
			console.log(tweak)
			changedIdx = tweak.idx
			changedOriginal = tweak.was
			changedBecame = tweak.became
			// console.log(instructions[changedIdx])
			instructions[changedIdx] = instructions[changedIdx].replace(changedOriginal, changedBecame)
			// console.log(instructions[changedIdx])
		}

	}

	console.error('Route Not Found');
	process.exit()
}

function findNextIdx(fromIdx, instructions) {

	for (var i = fromIdx; i < instructions.length; i++) {
		// console.log(instructions[i])
		if (instructions[i].indexOf('nop') == 0) {
			return {
				idx: i,
				became: 'jmp',
				was: 'nop'
			}
		} else if( instructions[i].indexOf('jmp') == 0) {
			return {
				idx: i,
				was: 'jmp',
				became: 'nop'
			}
		}
	}
	console.log("HERE")
	process.exit()

}

function tryRoute(ins) {
console.log(ins)
	var list = []
	for (let i = 0; i < ins.length; i++) {
		list.push({
			idx: i,
			step: ins[i],
			visits: 0,
			route: []
		})
	}

	var counter = 0
	for (let j = 0; j < ins.length; j++) {
		var s = ins[j].split(' ');

		list[j].route.push(counter)
		
		if (list[j].visits>0) {
			console.error('STOP!')
			// console.log(list[j])
			return false;
		}
		list[j].visits++;

		if (s[0] =='nop') {

		} else if (s[0] =='acc') {
			if (s[1].indexOf('+' == 0)) s[1] = +s[1].replace('+', '')
			else if (s[1].indexOf('-' == 0)) s[1] = +s[1]
			acc += s[1]
		} else if (s[0] =='jmp') {
			if (s[1].indexOf('+' == 0)) s[1] = +s[1].replace('+', '')
			else if (s[1].indexOf('-' == 0)) s[1] = +s[1]
			j = j+s[1]-1;
		}
		counter++;
	}

	console.info(acc)
	console.log(list)
	return true;
}


const assert = require("assert")

let example = `acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

assert(getAcc(example) == 8)
