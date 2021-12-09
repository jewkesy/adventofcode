var console = require('tracer').colorConsole();

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24`//,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1`
const testBoards =
`22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

function PlayBingo(numbers, boards)
{
	console.log(numbers, boards)

	for (var n = 0; n < numbers.length; n++) {
		// console.log(numbers[n])
		for (var b = 0; b < boards.length; b++) {
			var board = boards[b]
			// console.log(board)
			for (var j = 0; j < board.length; j++) {
				// console.log(board[j])

				if (numbers[n] == board[j]) {
					board[j] = 'x'
					var result = CheckBoard(board);
					// console.log(result)
					if (result > 0) {
						console.log(result, "Winner", "Board: " + (+b+1), board)
						console.log(boards)
						return;
					}
					break;
				}
			}
		}
	}
	console.log(boards)
}

function CheckBoard(board) {

	var bingo = true;
	for (var j = 0; j < board.length; j++) {
		if (board[j] != 'x') {
			bingo = false;
			break;
		}
	}
	if (bingo) return 3;

	// split into 5 chunks
	var i, j, line, chunk = 5;
	// for (i = 0, j = board.length; i < j; i += chunk) {
	//     line = (board.slice(i, i + chunk)).join();
	//     // console.log(line)
	//     if (line == 'x,x,x,x,x') return 1
	// }

	var cols = []
var maxVal = 5;

var delta = Math.floor( board.length / maxVal );
for (i = 0; i < board.length; i=i+delta) {
  cols.push(board[i]);
}

console.log(cols)


// process.exit()



	// return 0 is none
	// return 1 if line
	// return 2 if column
	// return 3 if bingo

	return 0
}

function SplitBoards(boards) {
	var bs = boards.split("\n\n")
	for (var i = 0; i < bs.length; i++) {
		bs[i] = bs[i].replace(/[\n\r]/g, ' ')
		bs[i] = bs[i].replace(/  +/g, ' ');
		bs[i] = bs[i].trim().split(" ");
	}
	return bs
}

PlayBingo(testInput.split(','), SplitBoards(testBoards))
