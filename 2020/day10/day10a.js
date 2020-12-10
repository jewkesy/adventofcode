const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 2080
  console.log("Puzzle Answer:", getJolts(puzzleInput.split('\n').map( x=> +x)))
})

function getJolts(input) {
	input.sort(function(a, b) { return a - b; });
	let target = getDeviceRating(input);

	input.push(target)

	let ones = 0;
	let threes = 0;
	let current = 0
	for (let i = 0; i < input.length; i++) {
		let diff = input[i] - current
		if (diff == 1) ones++
		else if (diff == 3) threes++
		current = input[i]
	}

	return {
		ones: ones,
		threes: threes,
		answer: ones*threes
	}
}

function getDeviceRating(input) {
	let max = Math.max(...input)+3;
	return max
}

const assert = require("assert")

let example1 = `16
10
15
5
1
11
7
19
6
12
4`

let example2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

assert(getDeviceRating(example1.split('\n').map( x=> +x)) == 22)
var result1 = getJolts(example1.split('\n').map( x=> +x));
assert(result1.answer == 7*5)

assert(getDeviceRating(example2.split('\n').map( x=> +x)) == 52)
var result2 = getJolts(example2.split('\n').map( x=> +x));
assert(result2.answer == 22*10)

