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

const LEVELS = ['easy_level', 'medium_level', 'hard_level']
const CARDS = [6, 12, 18];
const PAIRS = [3, 6, 9];

function emptyScreen() {
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

        const level_label = document.createElement('label');
        level_label.textContent = index;
        level_label.for = LEVELS[index - 1];
        level_label.classList.add('level-label');

        levelsBox.appendChild(level);
        levelsBox.appendChild(level_label);
    }

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
    buttonLevel.classList.add('btn_level', 'button');
    buttonLevel.textContent = 'Старт';
    divLevelBox.appendChild(buttonLevel);

    divLevel.appendChild(errorBlock);
    divLevel.appendChild(divLevelBox);

    buttonLevel.addEventListener('click', (event) => {
        event.preventDefault();
        if (window.application.level) {
            // загрузка экрана игры
            window.application.screens['game'] = renderScreenGame;
            window.application.renderScreen('game');
        } else {
            // вывод сообщения о том, что нужно выбрать уровень игры
            errorBlock.classList.remove('hidden__block');
        }
    })

    form.appendChild(header);
    form.appendChild(levelsBox);
    form.appendChild(divLevel);

    section.appendChild(form);

    app.appendChild(section);

    let levelElems = document.querySelectorAll('.level-label');
    levelElems.forEach(item => {
        item.addEventListener('click', clickHandler)
    })

    function clickHandler(e) {
        // убираем выделение кнопки выбора уровня у кнопок
        levelElems.forEach(item => {
            item.classList.remove('level_label--active');
        })
        e.target.classList.add('level_label--active');
        window.application.level = e.target.textContent;
        errorBlock.classList.add('hidden__block');
    }
}

function renderScreenGame() {
    const app = emptyScreen();
    let cards, pairs;

    const gameScreen = document.createElement('div');
    gameScreen.classList.add('screen', 'game_screen');

    const gameScreenField = document.createElement('div');
    gameScreenField.classList.add('game_screen_field');

    const header = document.createElement('h1');
    console.log(window.application.level);
    header.textContent = `Сложность игры : ${window.application.level}`;
    header.classList.add('game_header');

    const header_cards = document.createElement('h3');
    header_cards.classList.add('game_header_second');

    const header_pairs = document.createElement('h3');
    header_pairs.classList.add('game_header_second');

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

    header_cards.textContent = `Кол-во карт : ${cards}`;
    header_pairs.textContent = `Пар : ${pairs}`;

    gameScreenField.appendChild(header);
    gameScreenField.appendChild(header_cards);
    gameScreenField.appendChild(header_pairs);
    gameScreen.appendChild(gameScreenField);
    app.appendChild(gameScreen);
}

window.application.screens['gameLevel'] = renderScreenGameLevel;
window.application.renderScreen('gameLevel');