const PAIRS = [3, 6, 9];

function renderScreenGame() {
	const app = emptyScreen();

	window.application.blocks['newGame'] = renderNewGame;
	window.application.blocks['cards'] = renderCards;

	app.appendChild(templateEngine(gameScreenTemplate()));

	const gameScreen = document.querySelector('.game__screen');
	const headerScreen = document.querySelector('.game__screen-header');

	headerScreen.appendChild(templateEngine(playNewGameTemplate()));

	window.application.renderBlock('newGame', headerScreen);
	window.application.renderBlock('cards', gameScreen);
}

function renderNewGame() {
	document.querySelector('.game__button').addEventListener('click', (event) => {
		event.preventDefault();

		window.application.level = '';
		window.application.renderScreen('gameLevel');
	});
}

function playNewGameTemplate() {
	return {
		tag: 'button',
		cls: ['game__button', 'button'],
		text: 'Начать заново',
	};
}

function timer() {
	setTimeout(() => {
		gameWatch();
		coupCards();
	}, 5000);
}

function gameWatch() {
	const gameTimer = document.querySelector('.timer__degits');

	let milliseconds = 0;
	let startTimer;

	startTimer = setInterval(() => {
		milliseconds += 1000;

		let dateTimer = new Date(milliseconds);

		gameTimer.innerHTML =
			dateTimer.getUTCMinutes() +
			':' +
			('0' + dateTimer.getUTCSeconds()).slice(-2);
	}, 1000);
}

function coupCards() {
	const cardFront = document.querySelectorAll('.card__item-front');
	const cardBack = document.querySelectorAll('.card__item-back');

	cardBack.forEach((card) => {
		card.classList.remove('card__item_hidden');
	});

	cardFront.forEach((card) => {
		card.classList.add('card__item_hidden');
	});
}

function renderCards() {
	timer();

	// все карты
	let allCardValues = cards;
	// кол-во пар карт
	const numberOfCards = PAIRS[window.application.level - 1];
	// перемешивание карт
	let cardValues2 = shuffleCards(allCardValues);

	cardValues2 = cardValues2.slice(0, numberOfCards);
	cardValues2.push(...cardValues2);
	cardValues2 = shuffleCards(cardValues2);

	// let cardValues2 = getRandomCards(numberOfCards, allCardValues);
	// cardValues2.push(...cardValues2);
	// cardValues2 = shuffleCards(cardValues2);

	const cardsWrapper = document.querySelector('.cards__wrapper');

	cardValues2.forEach((card) => {
		cardsWrapper.appendChild(templateEngine(card));
	});

	// let levelElems = document.querySelectorAll(".card__item");
	// levelElems.forEach((item) => {
	//   item.addEventListener("click", checkCard);
	// });
}

// function checkCard(e) {
//   // открываем карту
//   console.log(e.target);
//   const childFront = e.target.firstChild;
//   debugger;

// }

function shuffleCards(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let randomIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array;
}

function getRandomCards(pairsOfCards, cardsArray) {
	let array = [];
	for (let i = 0; i < pairsOfCards; i++) {
		let randomIndex = Math.floor(Math.random() * (cardsArray.length - 1));
		console.log('randomIndex ', randomIndex);
		array[i] = cardsArray[randomIndex];
	}
	return array;
}

function gameScreenTemplate() {
	return {
		tag: 'div',
		cls: 'game__screen',
		content: [
			{
				tag: 'div',
				cls: 'game__screen-header',
				content: [
					{
						tag: 'div',
						cls: 'game__screen-timer',
						content: [
							{
								tag: 'div',
								cls: 'timer__titles',
								content: [
									{
										tag: 'div',
										cls: 'timer__title',
										text: 'min',
									},
									{
										tag: 'div',
										cls: 'timer__title',
										text: 'sek',
									},
								],
							},
							{
								tag: 'div',
								cls: 'timer__degits',
								text: `00:00`,
							},
						],
					},
				],
			},
			{
				tag: 'section',
				cls: 'game__screen-cards',
				content: [
					{
						tag: 'div',
						cls: 'cards__wrapper',
					},
				],
			},
		],
	};
}
