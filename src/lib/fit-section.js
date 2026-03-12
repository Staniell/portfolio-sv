const MOBILE_BREAKPOINT = 768;

/**
 * @param {number} value
 */
function round(value) {
	return Number(value.toFixed(4));
}

/**
 * @param {number} value
 */
function floorToPrecision(value) {
	return Math.floor(value * 10000) / 10000;
}

/**
 * @param {{ contentWidth: number; contentHeight: number; availableWidth: number; availableHeight: number; bleedX?: number; bleedY?: number }} metrics
 */
export function getFitMetrics({
	contentWidth,
	contentHeight,
	availableWidth,
	availableHeight,
	bleedX = 0,
	bleedY = 0
}) {
	if (contentWidth <= 0 || contentHeight <= 0 || availableWidth <= 0 || availableHeight <= 0) {
		return {
			scale: 1,
			fittedWidth: contentWidth,
			fittedHeight: contentHeight
		};
	}

	const visualWidth = contentWidth + bleedX;
	const visualHeight = contentHeight + bleedY;
	const scale = floorToPrecision(
		Math.min(1, availableWidth / visualWidth, availableHeight / visualHeight)
	);

	return {
		scale,
		fittedWidth: round(visualWidth * scale),
		fittedHeight: round(visualHeight * scale)
	};
}

/**
 * @param {HTMLElement} node
 * @param {number} scale
 * @param {number | null} fittedHeight
 */
function setFitStyles(node, scale, fittedHeight) {
	node.style.setProperty('--fit-scale', String(scale));
	node.style.setProperty('--fit-height', fittedHeight === null ? 'auto' : `${fittedHeight}px`);
}

/**
 * @param {HTMLElement} node
 */
export function fitSection(node) {
	const content = node.querySelector('[data-fit-content]');

	if (!(content instanceof HTMLElement)) {
		return {
			destroy() {}
		};
	}

	const update = () => {
		if (window.innerWidth <= MOBILE_BREAKPOINT) {
			setFitStyles(node, 1, null);
			return;
		}

		const bleedX = Number(node.dataset.fitBleedX ?? node.dataset.fitBleed ?? 24);
		const bleedY = Number(node.dataset.fitBleedY ?? node.dataset.fitBleed ?? 24);

		const { scale, fittedHeight } = getFitMetrics({
			contentWidth: content.offsetWidth,
			contentHeight: content.offsetHeight,
			availableWidth: node.clientWidth,
			availableHeight: node.clientHeight,
			bleedX,
			bleedY
		});

		setFitStyles(node, scale, fittedHeight);
	};

	const scheduleUpdate = () => {
		requestAnimationFrame(update);
	};

	const observer = new ResizeObserver(scheduleUpdate);
	observer.observe(node);
	observer.observe(content);

	if (document.fonts?.ready) {
		document.fonts.ready.then(scheduleUpdate);
	}

	scheduleUpdate();

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
