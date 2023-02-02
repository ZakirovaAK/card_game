import '../style/style.css';
import { renderScreenGameLevel } from './start-screen.js';

type ScreenName = 'gameLevel' | 'game' | 'lose' | 'win';

type BlockName =
	| 'startBtn'
	| 'levelNumber'
	| 'newGame'
	| 'cards'
	| 'clickHandler';

type ScreensObjType = Record<string, () => void>;
type BlocksObjType = Record<string, (container: HTMLElement) => void>;

type App = {
	blocks: BlocksObjType;
	screens: ScreensObjType;
	renderScreen: (screenName: ScreenName) => void;
	renderBlock: (blockName: BlockName, container: HTMLElement) => void;
	timers: string[];
	level: string;
	gameTime: string;
};

declare global {
	interface Window {
		application: App;
	}
}

window.application = {
	blocks: {},
	screens: {},
	renderScreen: function (screenName) {
		if (!this.screens[screenName]) {
			console.log('Такого экрана нет');
		} else {
			this.screens[screenName]();
		}
	},
	renderBlock: function (blockName, container) {
		if (!this.blocks[blockName]) {
			console.log('Такого блока нет');
		} else {
			this.blocks[blockName](container);
		}
	},
	timers: [],
	level: '0',
	gameTime: '',
};

// Экран выбора уровня
window.application.screens['gameLevel'] = renderScreenGameLevel;
window.application.renderScreen('gameLevel');
