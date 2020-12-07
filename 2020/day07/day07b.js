
const fs = require("fs")
var console = require('tracer').colorConsole();

// fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   // Answer: 211
//   console.log("Puzzle Answer:", countBags(puzzleInput, "shiny gold"))
// })

function countBags(input) {
  let unsortedAnswers = input.split('\n');
  let totalAnswers = 0;

  let sortedAnswers = [];
  let temp = [];

  for (let i = 0; i < unsortedAnswers.length; i++) {
    if (unsortedAnswers[i] !== '') {
      temp.push(unsortedAnswers[i]);
    }

    if (i === unsortedAnswers.length - 1 || unsortedAnswers[i] == '') {
      sortedAnswers.push(temp);
      temp = [];
    }
  }

  sortedAnswers.forEach(answers => {
    const combinedAnswers = answers.join('');
    const distinctAnswers = [...new Set(combinedAnswers.split(''))];

    for (let i = 0; i < distinctAnswers.length; i++) {
      const answer = distinctAnswers[i];

      if (answers.every(x => x.includes(answer))) totalAnswers += 1;
    }
   
  });
  console.log(totalAnswers)
  return totalAnswers;
}

const assert = require("assert")

let example = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`


assert(countBags(example, "shiny gold") == 32)
