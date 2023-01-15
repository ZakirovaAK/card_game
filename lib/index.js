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
    timers: []
}

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

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // загрузка игры
    })

    form.appendChild(header);
    form.appendChild(levels);
    form.appendChild(divLevel);

    section.appendChild(form);

    app.appendChild(section);
}

window.application.screens['gameLevel'] = renderScreenGameLevel;
window.application.renderScreen('gameLevel');