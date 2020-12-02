const fs = require("fs")
var console = require('tracer').colorConsole();


fs.readFile('./inputs/day03aInput.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 2572
  console.log("Puzzle Answer:", getHouseVisits(puzzleInput))
})

function getHouseVisits(directions) {

	let coordinates = new Set().add(`0x0`);

	directions.split('').reduce((curCoords, direction) => {
	  let newCoords = {};

	  if (direction === '^') newCoords = {x: curCoords.x, y: curCoords.y + 1};
	  if (direction === 'v') newCoords = {x: curCoords.x, y: curCoords.y - 1};
	  if (direction === '>') newCoords = {x: curCoords.x + 1, y: curCoords.y};
	  if (direction === '<') newCoords = {x: curCoords.x - 1, y: curCoords.y};

	  coordinates.add(`${newCoords.x}x${newCoords.y}`);
	  return newCoords;
	}, {x: 0, y: 0});

	return coordinates.size
}


const assert = require("assert")

assert(getHouseVisits(">") == 2)
assert(getHouseVisits("^>v<") == 4)
assert(getHouseVisits("^v^v^v^v^v") == 2)
console.log("Tests Passed")