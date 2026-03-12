/**
 * @param {{ top: number; height: number }[]} sections
 * @param {number} viewportCenter
 */
function getClosestIndexByCenter(sections, viewportCenter) {
	if (sections.length === 0) {
		return 0;
	}

	let closestIndex = 0;
	let closestDistance = Number.POSITIVE_INFINITY;

	for (const [index, section] of sections.entries()) {
		const center = section.top + section.height / 2;
		const distance = Math.abs(center - viewportCenter);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	}

	return closestIndex;
}

/**
 * @param {{ scrollY: number; viewportHeight: number; sections: { top: number; height: number }[] }} params
 */
export function getClosestSectionIndex({ scrollY, viewportHeight, sections }) {
	const viewportCenter = scrollY + viewportHeight / 2;
	return getClosestIndexByCenter(sections, viewportCenter);
}
