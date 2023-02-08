import { cardType, shuffleCards } from './game';
import { describe, expect, it } from '@jest/globals';

describe('shuffleCards()', () => {
	it('should return empty array', () => {
		const array = [] as cardType[];

		const result = shuffleCards(array);

		expect(result).toHaveLength(0);
	});

	it('should return an array with one element', () => {
		const array = [
			{
				tag: 'div',
				cls: 'card__item',
				attrs: {
					'data-id': '6D',
				},
				content: [
					{
						tag: 'img',
						cls: ['card__item-front'],
						attrs: {
							'data-id': '6D',
							width: '95',
							src: './static/img/6D.svg',
						},
					},
					{
						tag: 'img',
						cls: ['card__item-back', 'card__item_hidden'],
						attrs: {
							width: '95',
							src: './static/img/shirt.svg',
						},
					},
				],
			},
		];

		const result = shuffleCards(array);

		expect(result).toBe(array);
	});

	it('should return an array with two elements', () => {
		const array = [
			{
				tag: 'div',
				cls: 'card__item',
				attrs: {
					'data-id': '6H',
				},
				content: [
					{
						tag: 'img',
						cls: ['card__item-front'],
						attrs: {
							'data-id': '6H',
							width: '95',
							src: './static/img/6H.svg',
						},
					},
					{
						tag: 'img',
						cls: ['card__item-back', 'card__item_hidden'],
						attrs: {
							width: '95',
							src: './static/img/shirt.svg',
						},
					},
				],
			},
			{
				tag: 'div',
				cls: 'card__item',
				attrs: {
					'data-id': '6S',
				},
				content: [
					{
						tag: 'img',
						cls: ['card__item-front'],
						attrs: {
							'data-id': '6S',
							width: '95',
							src: './static/img/6S.svg',
						},
					},
					{
						tag: 'img',
						cls: ['card__item-back', 'card__item_hidden'],
						attrs: {
							width: '95',
							src: './static/img/shirt.svg',
						},
					},
				],
			},
		];

		const result = shuffleCards(array);

		expect(result).toHaveLength(2);
	});
});
