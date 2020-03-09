const fs = require('fs');
const readlineSync = require('readline-sync');

let arr = [];
while (arr.length < 5) {
	let r = Math.floor(Math.random() * 8) + 1;
	if (arr.indexOf(r) === -1) {
		arr.push(r);
	}
}

let rightAnswers = 0;
for (let n = 0; n < 5; n++) {
	const data = fs.readFileSync('quiz' + arr[n] + '.txt', 'utf8');
	let lines = data.split('\n');
	console.log(lines[0]);
	k = 1;
	for (let i = 2; i < lines.length - 1; i++) {
		console.log(k++ + '. ' + lines[i]);
	}

	let number = readlineSync.question('You answer? ');
	if (number == parseInt(lines[1])) {
		console.log('This is correct answer');
		rightAnswers++;
	} else {
		console.log('This is not correct answer');
	}
}

console.log('Number of right answers is ' + rightAnswers + ' out of 5');
