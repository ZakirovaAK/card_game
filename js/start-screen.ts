import { renderScreenGame } from './game.js';
import { templateEngine } from '../lib/template-engine.js';
/* eslint-disable no-unused-vars */
const LEVELS = ['easy_level', 'medium_level', 'hard_level'];

export function emptyScreen() {
	// очистка экрана
	const app = document.querySelector('.container') as HTMLElement;
	app.textContent = '';
	// return app;
}

// function renderBlockLevels(levelsBox: HTMLElement) {
// 	for (let index = 1; index <= 3; index++) {
// 		const level = document.createElement('input') as HTMLInputElement;
// 		level.classList.add('level-input');
// 		level.type = 'radio';
// 		level.id = LEVELS[index - 1];
// 		level.value = index.toString();

// 		const levelLabel = document.createElement('label') as HTMLLabelElement;
// 		levelLabel.textContent = index.toString();
// 		levelLabel.for = LEVELS[index - 1];
// 		levelLabel.classList.add('level-label');

// 		levelsBox.appendChild(level);
// 		levelsBox.appendChild(levelLabel);
// 	}
// }

export function renderScreenGameLevel() {
	// const app = emptyScreen();
	emptyScreen();
	const app = document.querySelector('.container') as HTMLElement;

	const section = document.createElement('section');
	section.classList.add('screen', 'screen-level');

	const form = document.createElement('form');
	form.classList.add('form_level');

	const header = document.createElement('h1');
	header.textContent = 'Выбери сложность';
	header.classList.add('level_header', 'element');

	// const levelsBox = document.createElement('div');
	// levelsBox.classList.add('level_select_div', 'element');

	// renderBlockLevels(levelsBox);

	const divLevel = document.createElement('div');
	divLevel.classList.add('element', 'elements__box');

	const errorBlock = document.createElement('div');
	errorBlock.classList.add('error__block', 'hidden__block');
	const errorMessage = document.createElement('h3');
	errorMessage.textContent = 'Пожалуйста, выберите уровень игры.';
	errorBlock.appendChild(errorMessage);

	const divLevelBox = document.createElement('div');
	const buttonLevel = document.createElement('button');
	buttonLevel.classList.add('btn_level');
	buttonLevel.textContent = 'Старт';
	divLevelBox.appendChild(buttonLevel);

	divLevel.appendChild(errorBlock);
	divLevel.appendChild(divLevelBox);

	buttonLevel.addEventListener('click', (event) => {
		event.preventDefault();
		if (window.application.level) {
			// загрузка экрана игры
			window.application.screens['game'] = renderScreenGame;
			renderScreenGame();
			// window.application.renderScreen('game');
		} else {
			// вывод сообщения о том, что нужно выбрать уровень игры
			errorBlock.classList.remove('hidden__block');
		}
	});

	form.appendChild(header);
	form.appendChild(templateEngine(levelScreenTemplate()));
	// form.appendChild(levelsBox);
	form.appendChild(divLevel);

	section.appendChild(form);

	app.appendChild(section);

	let levelElems = document.querySelectorAll('.level-label');
	levelElems.forEach((item) => {
		item.addEventListener('click', clickHandler);
	});

	function clickHandler(e: Event) {
		// убираем выделение кнопки выбора уровня у кнопок
		levelElems.forEach((item) => {
			item.classList.remove('level_label--active');
		});
		if (e.target instanceof HTMLElement) {
			e.target.classList.add('level_label--active');
			window.application.level = e.target.textContent || '';
			errorBlock.classList.add('hidden__block');
		}
	}
}

function levelScreenTemplate() {
	return {
		tag: 'div',
		cls: ['level_select_div', 'element'],
		content: [
			{
				tag: 'input',
				cls: 'level-input',
				type: 'radio',
				id: '1',
				text: '1',
			},
			{
				tag: 'label',
				cls: 'level-label',
				for: '1',
				text: '1',
			},
			{
				tag: 'input',
				cls: 'level-input',
				type: 'radio',
				id: '2',
				text: '2',
			},
			{
				tag: 'label',
				cls: 'level-label',
				for: '2',
				text: '2',
			},
			{
				tag: 'input',
				cls: 'level-input',
				type: 'radio',
				id: '3',
				text: '3',
			},
			{
				tag: 'label',
				cls: 'level-label',
				for: '3',
				text: '3',
			},
		],
	};
}
