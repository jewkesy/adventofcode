const fs = require("fs")
var console = require('tracer').colorConsole();

fs.readFile('./input.txt', 'utf8' , (err, puzzleInput) => {
  if (err) {
    console.error(err)
    return
  }
  // Answer: 211
  console.log("Puzzle Answer:", getAnswer(puzzleInput, "shiny gold"))
})


function getAnswer(input, bagToFind) {
  let rules = input.split('\n');
  let allbags = {};

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    const outermostBagPattern = /(\w*\s\w*)(\sbags)?\s(?:contain)\s/gm;
    const [, outermostBag] = outermostBagPattern.exec(rule);

    const cleanRule = rule.replace(outermostBagPattern, '').replace('.', '');
    const innerBags = cleanRule.split(',');

    allbags[outermostBag] = {
      innerTypes: {}
    };
    innerBags.forEach(bag => {
      const [, amount, bagType] = /(\d\s)?(\w+ \w+) bag(?:s)?(?:,)?/.exec(bag);

      if (bag !== 'no other bags') {
        allbags[outermostBag].innerTypes[bagType] = parseInt(amount.trim());
      }
    });  
  }
  
  let validBags = new Set();

  function findPaths(child, topLevelParent) {
    const children = Object.keys(allbags[child].innerTypes);

    if (children.includes(bagToFind)) {
      validBags.add(topLevelParent);
      return;
    }

    if (children.length === 0) return;

    for (let i = 0; i < children.length; i++) {
      findPaths(children[i], topLevelParent);
    }
  } 

  const topLevelBags = Object.keys(allbags);

  for (let i = 0; i < topLevelBags.length; i++) {
    findPaths(topLevelBags[i], topLevelBags[i]);
  }

  return validBags.size;
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


assert(getAnswer(example, "shiny gold") == 4)

