const { jsWithTs: tsjPreset } = require('ts-jest/presets');
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		...tsjPreset.transform,
	},
};
