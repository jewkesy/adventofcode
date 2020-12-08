const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 2058
  console.log("Puzzle Answer:", getAcc(puzzleInput))
})

function getAcc(instructions) {
	let acc = 0;
	var ins = instructions.split('\n');
	ins.unshift("nop +0")
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
			console.log(list[j])
			break;
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
	return acc;
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

assert(getAcc(example) == 5)
