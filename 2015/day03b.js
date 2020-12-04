const fs = require("fs")
var console = require('tracer').colorConsole();


fs.readFile('./inputs/day03aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 2631
  console.log("Puzzle Answer:", getHouseVisits(puzzleInput))
})

function getHouseVisits(directions) {
	let santaCoordinates = new Set().add(`0x0`);
	var santasTurn = true;

	var counter = 0;
	directions.split('').reduce((curCoords, direction) => {
		if (santasTurn) {
			if (counter % 2 != 0 ) {
				counter++
				return curCoords
			}
		}
	  let newCoords = {};

	  if (direction === '^') newCoords = {x: curCoords.x, y: curCoords.y + 1};
	  if (direction === 'v') newCoords = {x: curCoords.x, y: curCoords.y - 1};
	  if (direction === '>') newCoords = {x: curCoords.x + 1, y: curCoords.y};
	  if (direction === '<') newCoords = {x: curCoords.x - 1, y: curCoords.y};

	  // console.log(newCoords)
	  if (santasTurn) santaCoordinates.add(`${newCoords.x}x${newCoords.y}`);
	  else robotCoordinates.add(`${newCoords.x}x${newCoords.y}`);

	  counter++;
	  return newCoords;
	}, {x: 0, y: 0});

	let robotCoordinates = new Set().add(`0x0`);
	var counter = 0;
	santasTurn = false;
	directions.split('').reduce((curCoords, direction) => {
		if (!santasTurn) {
			if (counter % 2 == 0 ) {
				counter++
				return curCoords
			}
		}
	  let newCoords = {};

	  if (direction === '^') newCoords = {x: curCoords.x, y: curCoords.y + 1};
	  if (direction === 'v') newCoords = {x: curCoords.x, y: curCoords.y - 1};
	  if (direction === '>') newCoords = {x: curCoords.x + 1, y: curCoords.y};
	  if (direction === '<') newCoords = {x: curCoords.x - 1, y: curCoords.y};


	  if (santasTurn) santaCoordinates.add(`${newCoords.x}x${newCoords.y}`);
	  else robotCoordinates.add(`${newCoords.x}x${newCoords.y}`);

	  counter++;
	  return newCoords;
	}, {x: 0, y: 0});

	let uniqueCoords = new Set([...santaCoordinates, ...robotCoordinates])
	return uniqueCoords.size
}


const assert = require("assert")

assert(getHouseVisits("^v") == 3)
assert(getHouseVisits("^>v<") == 3)
assert(getHouseVisits("^v^v^v^v^v") == 11)
console.log("Tests Passed")