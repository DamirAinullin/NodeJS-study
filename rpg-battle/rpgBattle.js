const readlineSync = require('readline-sync');

let maxHealth = readlineSync.question('Set health of your hero: ');
const pattern = /^[0-9]+$/;

if (!maxHealth.match(pattern)) {
	console.log('You entered incorrect string');
	return;
}
if (maxHealth.length > 6) {
	console.log('You entered incorrect length number');
	return;
}

const monster = {
	maxHealth: 10,
	name: 'Лютый',
	moves: [
		{
			name: 'Удар когтистой лапой',
			physicalDmg: 3, // физический урон
			magicDmg: 0, // магический урон
			physicArmorPercents: 20, // физическая броня
			magicArmorPercents: 20, // магическая броня
			cooldown: 0, // ходов на восстановление
			realCooldown: 0
		},
		{
			name: 'Огненное дыхание',
			physicalDmg: 0,
			magicDmg: 4,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 3,
			realCooldown: 0
		},
		{
			name: 'Удар хвостом',
			physicalDmg: 2,
			magicDmg: 0,
			physicArmorPercents: 50,
			magicArmorPercents: 0,
			cooldown: 2,
			realCooldown: 0
		}
	]
};
const battleMagician = {
	maxHealth: maxHealth,
	name: 'Евстафий',
	moves: [
		{
			name: 'Удар боевым кадилом',
			physicalDmg: 2,
			magicDmg: 0,
			physicArmorPercents: 0,
			magicArmorPercents: 50,
			cooldown: 0,
			realCooldown: 0
		},
		{
			name: 'Вертушка левой пяткой',
			physicalDmg: 4,
			magicDmg: 0,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 4,
			realCooldown: 0
		},
		{
			name: 'Каноничный фаербол',
			physicalDmg: 0,
			magicDmg: 5,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 3,
			realCooldown: 0
		},
		{
			name: 'Магический блок',
			physicalDmg: 0,
			magicDmg: 0,
			physicArmorPercents: 100,
			magicArmorPercents: 100,
			cooldown: 4,
			realCooldown: 0
		}
	]
};

console.log('Your moves:');
for (var i = 0; i < battleMagician.moves.length; i++) {
	console.log(i + 1 + '. ' + battleMagician.moves[i].name);
}
while (true) {
	let yourMove;
	while (true) {
		let yourMoveNumber = readlineSync.question('Set number of your move: ');
		if (!yourMoveNumber.match(pattern)) {
			console.log('You entered incorrect string');
			continue;
		}
		if (yourMoveNumber - 1 < 0 || yourMoveNumber - 1 > battleMagician.moves.length) {
			console.log('You entered incorrect number');
			continue;
		}
		yourMove = battleMagician.moves[yourMoveNumber - 1];
		if (yourMove.realCooldown > 0) {
			console.log('You cant use this move now. Try something else.');
			continue;
		}
		break;
	}

	console.log(battleMagician.name + ' choose ' + yourMove.name);
	yourMove.realCooldown = yourMove.cooldown;

	let move;
	while (true) {
		let moveNumber = selfRandom(monster.moves.length - 1);
		move = monster.moves[moveNumber];
		if (move.realCooldown > 0) {
			continue;
		}
		break;
	}
	console.log(monster.name + ' choose ' + move.name);
	move.realCooldown = move.cooldown;

	battleMagician.maxHealth -=
		move.physicalDmg -
		(move.physicalDmg * yourMove.physicArmorPercents) / 100 +
		(move.magicDmg - (move.magicDmg * yourMove.magicArmorPercents) / 100);
	monster.maxHealth -=
		yourMove.physicalDmg -
		(yourMove.physicalDmg * yourMove.physicArmorPercents) / 100 +
		(yourMove.magicDmg - (yourMove.magicDmg * yourMove.magicArmorPercents) / 100);

	console.log();

	if (battleMagician.maxHealth <= 0) {
		if (monster.maxHealth <= 0) {
			console.log('Nobody has won');
		} else {
			console.log(monster.name + ' has won');
		}
		break;
	}
	if (monster.maxHealth <= 0) {
		console.log(battleMagician.name + ' has won');
		break;
	}

	console.log('Your health: ' + battleMagician.maxHealth);
	console.log('Monster health: ' + monster.maxHealth);

	for (var i = 0; i < battleMagician.moves.length; i++) {
		battleMagician.moves[i].realCooldown--;
	}
	for (var i = 0; i < monster.moves.length; i++) {
		monster.moves[i].realCooldown--;
	}
}

function selfRandom(max) {
	return Math.floor(Math.random() * max);
}
