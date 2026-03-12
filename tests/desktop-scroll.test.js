// @ts-nocheck

import assert from 'node:assert/strict';
import test from 'node:test';

import { getDesktopWheelAction } from '../src/lib/desktop-scroll.js';

test('keeps preventing desktop wheel events while a section transition is locked', () => {
	assert.deepEqual(getDesktopWheelAction({ innerWidth: 1280, isScrolling: true, deltaY: 120 }), {
		shouldPreventDefault: true,
		sectionDelta: 0
	});
});

test('maps unlocked desktop wheel events to section direction', () => {
	assert.deepEqual(getDesktopWheelAction({ innerWidth: 1280, isScrolling: false, deltaY: 120 }), {
		shouldPreventDefault: true,
		sectionDelta: 1
	});

	assert.deepEqual(getDesktopWheelAction({ innerWidth: 1280, isScrolling: false, deltaY: -120 }), {
		shouldPreventDefault: true,
		sectionDelta: -1
	});
});

test('leaves mobile wheel events to native scrolling', () => {
	assert.deepEqual(getDesktopWheelAction({ innerWidth: 768, isScrolling: false, deltaY: 120 }), {
		shouldPreventDefault: false,
		sectionDelta: 0
	});
});
