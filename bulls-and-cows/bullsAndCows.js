const readlineSync = require('readline-sync');

const codeSize = 60;
let code = '';
for (let index = 0; index < codeSize; index++) {
	code += selfRandom(9);
}
console.log(code);

const numberOfAttempts = 3;
for (let index = 0; index < numberOfAttempts; index++) {
	let number = readlineSync.question('Please enter a 6 digit number ? ');
	const pattern = /^[0-9]+$/;
	if (!number.match(pattern)) {
		console.log('You entered incorrect string');
		index--;
		continue;
	}
	if (number.length != codeSize) {
		console.log('You entered incorrect length number');
		index--;
		continue;
	}
	let numberObj = getPlacedAndUnplacedNumberObj(number, code);
	if (numberObj.placedNumbers.length == codeSize) {
		console.log(`You have won! Code is ${code}`);
		return;
	}
	console.log(
		`Matching digits not in place - ${numberObj.unplacedNumbers.length} (${numberObj.unplacedNumbers.join(', ')})`
	);
	console.log(`Matching digits in place - ${numberObj.placedNumbers.length} (${numberObj.placedNumbers.join(', ')})`);
}

function getPlacedAndUnplacedNumberObj(number, code) {
	let numberObj = {
		unplacedNumbers: [],
		placedNumbers: []
	};
	for (var i = 0; i < code.length; i++) {
		for (var j = 0; j < number.length; j++) {
			if (code.charAt(i) != number.charAt(j)) {
				continue;
			}
			if (i == j) {
				numberObj.placedNumbers.push(number.charAt(j));
			} else {
				numberObj.unplacedNumbers.push(number.charAt(j));
			}
		}
	}
	return numberObj;
}

function selfRandom(max) {
	return Math.floor(Math.random() * max);
}
