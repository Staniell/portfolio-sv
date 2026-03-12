import assert from 'node:assert/strict';
import test from 'node:test';

import {
	getClosestProjectIndex,
	getProjectSnapOffset
} from '../src/lib/components/projects-slider.js';

test('uses measured snap offsets to choose the nearest project after dragging', () => {
	const snapOffsets = [0, 1032, 2064];

	assert.equal(getClosestProjectIndex(508, snapOffsets), 0);
	assert.equal(getClosestProjectIndex(1540, snapOffsets), 1);
});

test('scrolls to the measured snap offset for each project index', () => {
	const snapOffsets = [0, 1032, 2064];

	assert.equal(getProjectSnapOffset(1, snapOffsets), 1032);
	assert.equal(getProjectSnapOffset(10, snapOffsets), 2064);
});
