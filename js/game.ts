import { emptyScreen } from './start-screen';
import { templateEngine } from '../lib/template-engine.js';
import { cards } from './cards';

const PAIRS: number[] = [3, 6, 9];
const LEVEL: string[] = [
	'cards__wrapper__easy',
	'cards__wrapper__medium',
	'cards__wrapper__hard',
];
let startTimer: ReturnType<typeof setInterval>;
let moves = 0; // кол-во угаданных пар карт
let hasFlippedCard: boolean = false; // перевернутая карта
let firstCard: HTMLElement, secondCard: HTMLElement;
let timeCode: string;

export function renderScreenGame() {
	emptyScreen();
	const app = document.querySelector('.container') as HTMLElement;

	window.application.blocks['newGame'] = renderNewGame;
	window.application.blocks['cards'] = renderCards;

	app.appendChild(templateEngine(gameScreenTemplate()));
	app.appendChild(templateEngine(winScreenTemplate()));
	app.appendChild(templateEngine(loseScreenTemplate()));

	const gameScreen = document.querySelector('.game__screen') as HTMLElement;
	const headerScreen = document.querySelector(
		'.game__screen-header'
	) as HTMLElement;

	headerScreen.appendChild(templateEngine(playNewGameTemplate()));

	window.application.renderBlock('newGame', headerScreen);
	window.application.renderBlock('cards', gameScreen);
}

function renderNewGame() {
	const gameButton = document.querySelector('.game__button') as HTMLElement;
	gameButton.addEventListener('click', (event) => {
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
	const gameTimer = document.querySelector('.timer__degits') as HTMLElement;

	let milliseconds = 0;

	startTimer = setInterval(() => {
		milliseconds += 1000;

		let dateTimer = new Date(milliseconds);
		timeCode =
			dateTimer.getUTCMinutes() +
			':' +
			('0' + dateTimer.getUTCSeconds()).slice(-2);
		gameTimer.innerHTML = timeCode;
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

type cardType = {
	tag: string;
	cls: string;
	attrs: {
		'data-id': string;
	};
	content: {
		tag: string;
		cls: string[];
		attrs: {
			width: string;
			src: string;
			'data-id'?: string;
		};
	}[];
};

function renderCards() {
	timer();

	// все карты
	let allCardValues: cardType[] = cards;
	// кол-во пар карт
	const numberOfCards = PAIRS[Number(window.application.level) - 1];
	// перемешивание карт
	let cardValues2 = shuffleCards(allCardValues);

	cardValues2 = cardValues2.slice(0, numberOfCards);
	cardValues2.push(...cardValues2);
	cardValues2 = shuffleCards(cardValues2);

	const cardsWrapper = document.querySelector('.cards__wrapper') as HTMLElement;

	// красивое расположение карт
	cardsWrapper.classList.add(LEVEL[Number(window.application.level) - 1]);

	cardValues2.forEach((card: cardType) => {
		cardsWrapper.appendChild(templateEngine(card));
	});

	let playCards: NodeListOf<Element> = document.querySelectorAll('.card__item');
	playCards.forEach((playCard) => {
		playCard.addEventListener('click', flipCard);
	});
}

function coupOneCard(children: HTMLCollection) {
	// переворачиваем карту
	for (let index = 0; index < children.length; index++) {
		const element = children[index];
		const childClassList = [...element.classList];
		if (childClassList.includes('card__item-front')) {
			element.classList.remove('card__item_hidden');
		} else if (childClassList.includes('card__item-back')) {
			element.classList.add('card__item_hidden');
		}
	}
}

function flipCard(this: HTMLElement) {
	if (this === firstCard) return;

	const children: HTMLCollection = this.children;
	// переворачиваем одну карту
	coupOneCard(children);

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	console.log('firstCard', firstCard);
	console.log('secondCard', secondCard);

	checkCard();
}

function checkCard() {
	if (firstCard.dataset.id === secondCard.dataset.id) {
		disableCards();
		return;
	}

	// остановка таймера!!!!
	clearInterval(startTimer);
	// сохранение времени
	window.application.gameTime = timeCode;
	console.log('вы проиграли');
	// looseGame(); // Окошко вы проиграли
	moves = 0;
	hasFlippedCard = false;
	// Экран проигрыша
	// модальное окно Проигрыша
	console.log('время ', window.application.gameTime);
	console.log(typeof window.application.gameTime);
	const modalLose = document.querySelector('.modal__lose') as HTMLElement;
	const time = modalLose.querySelector('.time') as HTMLElement;
	time.textContent = window.application.gameTime;
	modalLose.style.display = 'block';

	// console.log('время ', window.application.gameTime);
	// 	console.log(typeof window.application.gameTime);
	// 	const modalWin = document.querySelector('.modal__win') as HTMLElement;
	// 	const time = modalWin.querySelector('.time') as HTMLElement;
	// 	time.textContent = window.application.gameTime;
	// 	modalWin.style.display = 'block';
}

function disableCards() {
	// для firstCard и secondCard убираем подписку на click через метод
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	console.log('disable');
	//обнуляем карты
	hasFlippedCard = false;
	moves += 1;
	if (moves === PAIRS[Number(window.application.level) - 1]) {
		// остановка таймера!!!!
		clearInterval(startTimer);
		console.log('вы выйграли!!!');
		// вы выйграли
		moves = 0;
		// сохранение времени
		window.application.gameTime = timeCode;
		// Экран выйгрыша
		// модальное окно Выйгрыша
		console.log('время ', window.application.gameTime);
		console.log(typeof window.application.gameTime);
		const modalWin = document.querySelector('.modal__win') as HTMLElement;
		const time = modalWin.querySelector('.time') as HTMLElement;
		time.textContent = window.application.gameTime;
		modalWin.style.display = 'block';
	}
}

function shuffleCards(array: cardType[]) {
	for (let i = array.length - 1; i > 0; i--) {
		let randomIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
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

function winScreenTemplate() {
	return {
		tag: 'div',
		cls: ['modal__win', 'modal'],
		content: [
			{
				tag: 'section',
				cls: 'modal-content',
				content: [
					{
						tag: 'form',
						cls: 'form_result-game',
						content: [
							{
								tag: 'img',
								cls: ['form_result-game__img'],
								attrs: {
									width: '96',
									src: './static/img/win.png',
								},
							},
							{
								tag: 'h1',
								text: 'Вы выйграли!',
								cls: ['header', 'header_result-game'],
							},
							{
								tag: 'div',
								content: [
									{
										tag: 'h3',
										text: 'Затраченное время:',
									},
									{
										tag: 'h1',
										cls: ['header', 'time'],
										text: window.application.gameTime,
									},
								],
							},
							{
								tag: 'div',
								content: [
									{
										tag: 'button',
										cls: ['btn_level'],
										text: 'Играть снова',
									},
								],
							},
						],
					},
				],
			},
		],
	};
}

function loseScreenTemplate() {
	return {
		tag: 'div',
		cls: ['modal', 'modal__lose'],
		content: [
			{
				tag: 'section',
				cls: 'modal-content',
				content: [
					{
						tag: 'form',
						cls: 'form_result-game',
						content: [
							{
								tag: 'img',
								cls: ['form_result-game__img'],
								attrs: {
									width: '90',
									src: './static/img/lose.png',
								},
							},
							{
								tag: 'h1',
								text: 'Вы проиграли!',
								cls: ['header', 'header_result-game'],
							},
							{
								tag: 'div',
								content: [
									{
										tag: 'h3',
										text: 'Затраченное время:',
									},
									{
										tag: 'h1',
										cls: ['header', 'time'],
										text: window.application.gameTime,
									},
								],
							},
							{
								tag: 'div',
								content: [
									{
										tag: 'button',
										cls: ['btn_level'],
										text: 'Играть снова',
									},
								],
							},
						],
					},
				],
			},
		],
	};
}
