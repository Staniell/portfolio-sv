// @ts-nocheck

import assert from 'node:assert/strict';
import test from 'node:test';

import { getFitMetrics } from '../src/lib/fit-section.js';

test('keeps scale at 1 when content already fits', () => {
	assert.deepEqual(
		getFitMetrics({
			contentWidth: 900,
			contentHeight: 640,
			availableWidth: 1200,
			availableHeight: 800
		}),
		{ scale: 1, fittedWidth: 900, fittedHeight: 640 }
	);
});

test('scales down by height when content is too tall', () => {
	assert.deepEqual(
		getFitMetrics({
			contentWidth: 900,
			contentHeight: 1000,
			availableWidth: 1200,
			availableHeight: 750
		}),
		{ scale: 0.75, fittedWidth: 675, fittedHeight: 750 }
	);
});

test('scales down by width when content is too wide', () => {
	assert.deepEqual(
		getFitMetrics({
			contentWidth: 1000,
			contentHeight: 600,
			availableWidth: 800,
			availableHeight: 900
		}),
		{ scale: 0.8, fittedWidth: 800, fittedHeight: 480 }
	);
});

test('uses the more restrictive axis when both dimensions overflow', () => {
	assert.deepEqual(
		getFitMetrics({
			contentWidth: 1000,
			contentHeight: 1200,
			availableWidth: 900,
			availableHeight: 840
		}),
		{ scale: 0.7, fittedWidth: 700, fittedHeight: 840 }
	);
});

test('includes bleed padding when computing the fit scale', () => {
	assert.deepEqual(
		getFitMetrics({
			contentWidth: 1000,
			contentHeight: 1000,
			availableWidth: 900,
			availableHeight: 900,
			bleedX: 40,
			bleedY: 20
		}),
		{ scale: 0.8653, fittedWidth: 899.912, fittedHeight: 882.606 }
	);
});
