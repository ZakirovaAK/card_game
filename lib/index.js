window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName) {
        if (window.application.screens[screenName]) {
            window.application.screens[screenName]();
        } else {
            console.log('Такого экрана нет');
        }

    },
    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container);
        } else {
            console.log('Такого блока нет');
        }

    },
    timers: [],
    level: ''
}

const CARDS = [6, 12, 18];
const PAIRS = [3, 6, 9];

function emptyScreen() {
    // очистка экрана
    const app = document.querySelector('.container');
    app.textContent = '';
    return app;
}

function renderScreenGameLevel() {
    const app = emptyScreen();

    const section = document.createElement('section');
    section.classList.add('screen', 'screen-level');

    const form = document.createElement('form');
    form.classList.add('form_level');

    const header = document.createElement('h1');
    header.textContent = 'Выбери сложность';
    header.classList.add('level_header', 'element');

    const levels = document.createElement('div');
    levels.classList.add('level_select_div', 'element');

    const level1 = document.createElement('button');
    level1.classList.add('btn_level_select');
    level1.textContent = '1';
    const level2 = document.createElement('button');
    level2.classList.add('btn_level_select');
    level2.textContent = '2';
    const level3 = document.createElement('button');
    level3.classList.add('btn_level_select');
    level3.textContent = '3';

    levels.appendChild(level1);
    levels.appendChild(level2);
    levels.appendChild(level3);

    const divLevel = document.createElement('div');
    divLevel.classList.add('element');

    const buttonLevel = document.createElement('button');
    buttonLevel.classList.add('btn_level', 'button');
    buttonLevel.textContent = 'Старт';

    divLevel.appendChild(buttonLevel);

    // let levelElems = document.querySelectorAll('btn_level_select');

    // levelElems.forEach(item => {
    //     item.addEventListener('click', clickHandler)
    // })

    // function clickHandler(e) {
    //     if (e.target.classList.contains('btn_level_select')) {
    //         e.target.classList.add('btn_level_select--active');
    //         window.application.level = e.target.textContent;
    //     }
    // }

    // document.addEventListener('click', (event) => {
    //     if (event.target.className === 'btn_level_select') {
    //         event.target.classList.add('btn_level_select--active');
    //         window.application.level = event.target.textContent;
    //     }
    // });

    // document.addEventListener('click', (event) => {
    //     if (event.target.className === 'btn_level') {
    //         if (window.application.level) {
    //             // загрузка экрана игры
    //             window.application.screens['game'] = renderScreenGame;
    //             window.application.renderScreen('game');
    //         } else {
    //             // вывод сообщения о том, что нужно выбрать уровень игры
    //             alert('Выберите уровень игры');
    //         }
    //     } else if (event.target.className === 'btn_level_select') {
    //         console.log(event.target.textContent);
    //         event.target.classList.add('btn_level_select--active');
    //         window.application.level = event.target.textContent;
    //     }
    // })

    level1.addEventListener('click', () => {
        level1.classList.add('btn_level_select--active');
        window.application.level = 1;
    })

    level2.addEventListener('click', () => {
        level1.classList.add('btn_level_select--active');
        window.application.level = 2;
    })

    level3.addEventListener('click', () => {
        level1.classList.add('btn_level_select--active');
        window.application.level = 3;
    })

    buttonLevel.addEventListener('click', () => {
        if (window.application.level) {
            // загрузка экрана игры
            window.application.screens['game'] = renderScreenGame;
            window.application.renderScreen('game');
        } else {
            // вывод сообщения о том, что нужно выбрать уровень игры
            alert('Для запуска игры нужно выбрать уровень игры, пожалуйста выберите уровень игры');
        }
    })

    form.appendChild(header);
    form.appendChild(levels);
    form.appendChild(divLevel);

    section.appendChild(form);

    app.appendChild(section);
}

function renderScreenGame() {
    const app = emptyScreen();
    let cards, pairs;

    const gameField = document.createElement('div');
    gameField.classList.add('screen', 'game_screen');

    const header = document.createElement('h1');
    console.log(window.application.level);
    header.textContent = `Сложность игры : ${window.application.level}`;
    header.classList.add('game_header');

    if (window.application.level === '3') {
        cards = CARDS[2];
        pairs = PAIRS[2];
    } else if (window.application.level === '2') {
        cards = CARDS[1];
        pairs = PAIRS[1];
    }
    else {
        cards = CARDS[0];
        pairs = PAIRS[0];
    }
    gameField.appendChild(header);
    app.appendChild(gameField);
}

window.application.screens['gameLevel'] = renderScreenGameLevel;
window.application.renderScreen('gameLevel');