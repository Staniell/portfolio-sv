/**
 * @param {number} index
 * @param {number[]} snapOffsets
 */
function clampProjectIndex(index, snapOffsets) {
	if (snapOffsets.length === 0) {
		return 0;
	}

	return Math.min(Math.max(index, 0), snapOffsets.length - 1);
}

/**
 * @param {number} scrollLeft
 * @param {number[]} snapOffsets
 */
export function getClosestProjectIndex(scrollLeft, snapOffsets) {
	if (snapOffsets.length === 0) {
		return 0;
	}

	let closestIndex = 0;
	let closestDistance = Number.POSITIVE_INFINITY;

	for (const [index, snapOffset] of snapOffsets.entries()) {
		const distance = Math.abs(scrollLeft - snapOffset);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	}

	return closestIndex;
}

/**
 * @param {number} index
 * @param {number[]} snapOffsets
 */
export function getProjectSnapOffset(index, snapOffsets) {
	if (snapOffsets.length === 0) {
		return 0;
	}

	return snapOffsets[clampProjectIndex(index, snapOffsets)];
}
