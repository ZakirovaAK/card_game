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
	level: '',
};

// Экран выбора уровня
window.application.screens['gameLevel'] = renderScreenGameLevel;
window.application.renderScreen('gameLevel');
