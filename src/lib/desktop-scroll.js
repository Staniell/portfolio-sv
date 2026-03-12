/**
 * @param {{ innerWidth: number; isScrolling: boolean; deltaY: number }} params
 */
export function getDesktopWheelAction({ innerWidth, isScrolling, deltaY }) {
	if (innerWidth <= 768) {
		return { shouldPreventDefault: false, sectionDelta: 0 };
	}

	if (isScrolling || deltaY === 0) {
		return { shouldPreventDefault: true, sectionDelta: 0 };
	}

	return {
		shouldPreventDefault: true,
		sectionDelta: deltaY > 0 ? 1 : -1
	};
}
