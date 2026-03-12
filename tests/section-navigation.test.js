// @ts-nocheck

import assert from 'node:assert/strict';
import test from 'node:test';

import { getClosestSectionIndex } from '../src/lib/section-navigation.js';

test('returns the section whose center is closest to the viewport center', () => {
	const sections = [
		{ top: 0, height: 800 },
		{ top: 800, height: 800 },
		{ top: 1600, height: 800 }
	];

	assert.equal(getClosestSectionIndex({ scrollY: 860, viewportHeight: 800, sections }), 1);
});

test('switches to the previous section as soon as the viewport center moves above the current one', () => {
	const sections = [
		{ top: 0, height: 800 },
		{ top: 800, height: 800 },
		{ top: 1600, height: 800 }
	];

	assert.equal(getClosestSectionIndex({ scrollY: 330, viewportHeight: 800, sections }), 0);
});

test('returns zero when no measurable sections exist', () => {
	assert.equal(getClosestSectionIndex({ scrollY: 0, viewportHeight: 800, sections: [] }), 0);
});
