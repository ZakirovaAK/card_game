import { renderScreenGame } from './game';
import { templateEngine } from '../lib/template-engine.js';

export function emptyScreen() {
	// очистка экрана
	const app = document.querySelector('.container') as HTMLElement;
	app.textContent = '';
}

export function renderScreenGameLevel() {
	emptyScreen();
	const app = document.querySelector('.container') as HTMLElement;

	const section = document.createElement('section');
	section.classList.add('screen', 'screen-level');

	const form = document.createElement('form');
	form.classList.add('form_level');

	const header = document.createElement('h1');
	header.textContent = 'Выбери сложность';
	header.classList.add('level_header', 'element');

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
		} else {
			// вывод сообщения о том, что нужно выбрать уровень игры
			errorBlock.classList.remove('hidden__block');
		}
	});

	form.appendChild(header);
	form.appendChild(templateEngine(levelScreenTemplate()));
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
