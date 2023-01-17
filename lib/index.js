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

    const levelsBox = document.createElement('div');
    levelsBox.classList.add('level_select_div', 'element');

    const level1 = document.createElement('input');
    level1.classList.add('level-input');
    level1.type = 'radio';
    level1.id = 'easy_level';
    level1.value = 1;
    const level1_label = document.createElement('label');
    level1_label.for = 'easy_level';
    level1_label.textContent = '1';
    level1_label.classList.add('level-label');

    const level2 = document.createElement('input');
    level2.classList.add('level-input');
    level2.type = 'radio';
    level2.id = 'medium_level';
    level2.value = 2;
    const level2_label = document.createElement('label');
    level2_label.textContent = '2';
    level2_label.for = 'medium_level';
    level2_label.classList.add('level-label');

    const level3 = document.createElement('input');
    level3.classList.add('level-input');
    level3.type = 'radio';
    level3.id = 'hard_level';
    level3.value = 3;
    const level3_label = document.createElement('label');
    level3_label.textContent = '3';
    level3_label.for = 'hard_level';
    level3_label.classList.add('level-label');

    levelsBox.appendChild(level1);
    levelsBox.appendChild(level1_label);
    levelsBox.appendChild(level2);
    levelsBox.appendChild(level2_label);
    levelsBox.appendChild(level3);
    levelsBox.appendChild(level3_label);

    const divLevel = document.createElement('div');
    divLevel.classList.add('element');

    const errorBlock = document.createElement('div');
    errorBlock.classList.add('error__block', 'hidden__block');
    const errorMessage = document.createElement('h3');
    errorMessage.textContent = 'Пожалуйста, выберите уровень игры.';
    errorBlock.appendChild(errorMessage);

    const buttonLevel = document.createElement('button');
    buttonLevel.classList.add('btn_level', 'button');
    buttonLevel.textContent = 'Старт';

    divLevel.appendChild(buttonLevel);

    level1_label.addEventListener('click', () => {
        level1_label.classList.add('level_label--active');
        errorBlock.classList.add('hidden__block');
        window.application.level = '1';
    })

    level2_label.addEventListener('click', () => {
        level2_label.classList.add('level_label--active');
        errorBlock.classList.add('hidden__block');
        window.application.level = '2';
    })

    level3_label.addEventListener('click', () => {
        level3_label.classList.add('level_label--active');
        errorBlock.classList.add('hidden__block');
        window.application.level = '3';
    })

    buttonLevel.addEventListener('click', () => {
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
    form.appendChild(errorBlock);
    form.appendChild(divLevel);

    section.appendChild(form);
    

    app.appendChild(section);

    // let levelElems = document.querySelectorAll('level-label');
    // console.log(levelElems);

    // levelElems.forEach(item => {
    //     item.addEventListener('click', clickHandler)
    // })

    // function clickHandler(e) {
    //     debugger;
    //     console.log(e.target);
    //     window.application.level = e.target.textContent;
    // }
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