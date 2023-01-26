import { renderScreenGame } from './game.js';
/* eslint-disable no-unused-vars */
const LEVELS = ['easy_level', 'medium_level', 'hard_level'];

export function emptyScreen() {
	// очистка экрана
	const app = document.querySelector('.container');
	app.textContent = '';
	return app;
}

function renderBlockLevels(levelsBox) {
	for (let index = 1; index <= 3; index++) {
		const level = document.createElement('input');
		level.classList.add('level-input');
		level.type = 'radio';
		level.id = LEVELS[index - 1];
		level.value = index;

		const levelLabel = document.createElement('label');
		levelLabel.textContent = index;
		levelLabel.for = LEVELS[index - 1];
		levelLabel.classList.add('level-label');

		levelsBox.appendChild(level);
		levelsBox.appendChild(levelLabel);
	}
}

export function renderScreenGameLevel() {
	const app = emptyScreen();

	const section = document.createElement('section');
	section.classList.add('screen', 'screen-level');

	const form = document.createElement('form');
	form.classList.add('form_level');

	const header = document.createElement('h1');
	header.textContent = 'Выбери сложность';
	header.classList.add('level_header', 'element');

	const levelsBox = document.createElement('div');
	levelsBox.classList.add('level_select_div', 'element');

	renderBlockLevels(levelsBox);

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
	form.appendChild(levelsBox);
	form.appendChild(divLevel);

	section.appendChild(form);

	app.appendChild(section);

	let levelElems = document.querySelectorAll('.level-label');
	levelElems.forEach((item) => {
		item.addEventListener('click', clickHandler);
	});

	function clickHandler(e) {
		// убираем выделение кнопки выбора уровня у кнопок
		levelElems.forEach((item) => {
			item.classList.remove('level_label--active');
		});
		e.target.classList.add('level_label--active');
		window.application.level = +e.target.textContent;
		errorBlock.classList.add('hidden__block');
	}
}
