const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 633
  console.log("Puzzle Answer:", listAllSeatIds(puzzleInput.split('\n')))
})

function listAllSeatIds(boardingPasses) {
	let arrSeatIds = []

	for (var i = 0; i < boardingPasses.length; i++) {
		arrSeatIds.push(getSeatId(boardingPasses[i]))
	}
	arrSeatIds.sort()
	console.log(arrSeatIds)

	var min = arrSeatIds[0];
	var max = arrSeatIds[arrSeatIds.length-1]

	console.log(min, max)
	for (var j = min; j < max; j++) {
		if (arrSeatIds.indexOf(j) == -1) {
			console.log(j)
			return j;
		}
	}
	return -1
}

function getSeatId(boardingPass) {

	let row = getPlaneRow(boardingPass.substring(0, 7), 128);
	let col = getPlaneCol(boardingPass.substr(boardingPass.length - 3), 8);
	let seatId = (row * 8) + col;
	return seatId;
}

function getPlaneRow(boardingPass, totalRows) {
	var arrPositions = boardingPass.split('')
	let arrRows = [];
	for (var i = 1; i <= totalRows; i++) {
		arrRows.push(i)
	}

	for (var i = 0; i < arrPositions.length; i++) {
		let item = arrPositions[i];
		let half = Math.ceil(arrRows.length / 2);
		// console.log(half)		
		if (item == "F") {
			arrRows = arrRows.splice(0, half);
		} else if (item == "B") {
			arrRows = arrRows.splice(-half);
		}
		// console.log(arrRows)
	}

	return arrRows[0]-1
}

function getPlaneCol(boardingPass, totalCols) {
	var arrPositions = boardingPass.split('')
	let arrCols = [];
	for (var i = 1; i <= totalCols; i++) {
		arrCols.push(i)
	}

	for (let i = 0; i < arrPositions.length; i++) {
		let item = arrPositions[i];
		let half = Math.ceil(arrCols.length / 2);
		// console.log(half)		
		if (item == "L") {
			arrCols = arrCols.splice(0, half);
		} else if (item == "R") {
			arrCols = arrCols.splice(-half);
		}
		// console.log(arrCols)
	}
	return arrCols[0]-1
}

const assert = require("assert")
assert(getPlaneRow("FBFBBFF", 128) == 44)
assert(getPlaneRow("BFFFBBF", 128) == 70)
assert(getPlaneRow("FFFBBBF", 128) == 14)
assert(getPlaneRow("BBFFBBF", 128) == 102)

assert(getPlaneCol("RLR", 8) == 5)
assert(getPlaneCol("RRR", 8) == 7)
assert(getPlaneCol("RLL", 8) == 4)

assert(getSeatId("FBFBBFFRLR") == 357)
assert(getSeatId("BFFFBBFRRR") == 567)
assert(getSeatId("FFFBBBFRRR") == 119)
assert(getSeatId("BBFFBBFRLL") == 820)
