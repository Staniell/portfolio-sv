/**
 * @param {{ innerWidth: number; isScrolling: boolean; deltaY: number }} params
 * @returns {{ shouldPreventDefault: boolean; sectionDelta: number; shouldResetLock: boolean }}
 */
export function getDesktopWheelAction({ innerWidth, isScrolling, deltaY }) {
	if (innerWidth <= 768) {
		return { shouldPreventDefault: false, sectionDelta: 0, shouldResetLock: false };
	}

	if (isScrolling || deltaY === 0) {
		return { shouldPreventDefault: true, sectionDelta: 0, shouldResetLock: false };
	}

	return {
		shouldPreventDefault: true,
		sectionDelta: deltaY > 0 ? 1 : -1,
		shouldResetLock: true
	};
}
