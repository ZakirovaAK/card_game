import { emptyScreen } from './start-screen';

export function renderScreenWin() {
	const app = emptyScreen();

	const section = document.createElement('section');
	section.classList.add('screen', 'screen_result-game');

	const form = document.createElement('form');
	form.classList.add('form_result-game');
	// TODO картинка
	const header = document.createElement('h1');
	header.textContent = 'Вы выйграли!';
	header.classList.add('header', 'header_result-game', 'element');

	const timeBox = document.createElement('div');
	const headerTime = document.createElement('h3');
	headerTime.textContent = 'Затраченное время:';
	const time = document.createElement('h1');
	time.classList.add('header');
	time.textContent = window.application.gameTime;
	timeBox.appendChild(headerTime);
	timeBox.appendChild(time);

	const newGameBox = document.createElement('div');
	const buttonNewGame = document.createElement('button');
	buttonNewGame.classList.add('btn_level');
	buttonNewGame.textContent = 'Играть снова';
	newGameBox.appendChild(buttonNewGame);

	buttonNewGame.addEventListener('click', (event) => {
		// новая игра
		event.preventDefault();

		window.application.level = '';
		window.application.renderScreen('gameLevel');
	});

	form.appendChild(header);
	form.appendChild(timeBox);
	form.appendChild(newGameBox);

	section.appendChild(form);

	app.appendChild(section);
}
