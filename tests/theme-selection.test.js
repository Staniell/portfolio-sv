// @ts-nocheck

import assert from 'node:assert/strict';
import test from 'node:test';

import { THEMES, getRandomTheme } from '../src/lib/theme.js';

test('exposes the warm theme set', () => {
	assert.deepEqual(THEMES, ['sunset', 'marigold', 'lagoon']);
});

test('maps deterministic random values to a stable theme choice', () => {
	assert.equal(
		getRandomTheme(() => 0),
		'sunset'
	);
	assert.equal(
		getRandomTheme(() => 0.5),
		'marigold'
	);
	assert.equal(
		getRandomTheme(() => 0.999999),
		'lagoon'
	);
});

test('always returns one of the supported themes', () => {
	const theme = getRandomTheme(() => 0.2);
	assert.equal(THEMES.includes(theme), true);
});
