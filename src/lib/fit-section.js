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
 * @param {string | undefined} value
 * @param {number} fallback
 * @param {(reference: string) => string | undefined} [resolveReference]
 */
function parseBleedValue(value, fallback, resolveReference) {
	if (value === undefined) {
		return fallback;
	}

	const cssVarMatch = /^var\((--[^)\s,]+)\)$/.exec(value.trim());
	const resolvedValue = cssVarMatch ? resolveReference?.(cssVarMatch[1]) : value;
	const parsed = Number((resolvedValue ?? value).trim());
	return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * @param {{ fitBleed?: string; fitBleedX?: string; fitBleedY?: string; fitBleedLeft?: string; fitBleedRight?: string; fitBleedTop?: string; fitBleedBottom?: string }} dataset
 * @param {(reference: string) => string | undefined} [resolveReference]
 */
export function getFitBleed(dataset, resolveReference) {
	const defaultBleed = parseBleedValue(dataset.fitBleed, 24, resolveReference);
	const hasDirectionalBleedX =
		dataset.fitBleedLeft !== undefined || dataset.fitBleedRight !== undefined;
	const hasDirectionalBleedY =
		dataset.fitBleedTop !== undefined || dataset.fitBleedBottom !== undefined;

	return {
		bleedX: parseBleedValue(
			dataset.fitBleedX,
			hasDirectionalBleedX ? 0 : defaultBleed,
			resolveReference
		),
		bleedY: parseBleedValue(
			dataset.fitBleedY,
			hasDirectionalBleedY ? 0 : defaultBleed,
			resolveReference
		),
		bleedLeft: parseBleedValue(dataset.fitBleedLeft, 0, resolveReference),
		bleedRight: parseBleedValue(dataset.fitBleedRight, 0, resolveReference),
		bleedTop: parseBleedValue(dataset.fitBleedTop, 0, resolveReference),
		bleedBottom: parseBleedValue(dataset.fitBleedBottom, 0, resolveReference)
	};
}

/**
 * @param {{ fitInset?: string; fitInsetTop?: string; fitInsetBottom?: string }} dataset
 * @param {(reference: string) => string | undefined} [resolveReference]
 */
export function getFitInsets(dataset, resolveReference) {
	const defaultInset = parseBleedValue(dataset.fitInset, 0, resolveReference);

	return {
		insetTop: parseBleedValue(dataset.fitInsetTop, defaultInset, resolveReference),
		insetBottom: parseBleedValue(dataset.fitInsetBottom, defaultInset, resolveReference)
	};
}

/**
 * @param {{ contentWidth: number; contentHeight: number; availableWidth: number; availableHeight: number; bleedX?: number; bleedY?: number; bleedLeft?: number; bleedRight?: number; bleedTop?: number; bleedBottom?: number }} metrics
 */
export function getFitMetrics({
	contentWidth,
	contentHeight,
	availableWidth,
	availableHeight,
	bleedX = 0,
	bleedY = 0,
	bleedLeft = 0,
	bleedRight = 0,
	bleedTop = 0,
	bleedBottom = 0
}) {
	if (contentWidth <= 0 || contentHeight <= 0 || availableWidth <= 0 || availableHeight <= 0) {
		return {
			scale: 1,
			fittedWidth: contentWidth,
			fittedHeight: contentHeight
		};
	}

	const visualWidth = contentWidth + bleedX + bleedLeft + bleedRight;
	const visualHeight = contentHeight + bleedY + bleedTop + bleedBottom;
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
 * @param {number} insetTop
 * @param {number} insetBottom
 */
function setFitStyles(node, scale, fittedHeight, insetTop, insetBottom) {
	node.style.setProperty('--fit-scale', String(scale));
	node.style.setProperty('--fit-height', fittedHeight === null ? 'auto' : `${fittedHeight}px`);
	node.style.setProperty('--fit-inset-top', `${insetTop}px`);
	node.style.setProperty('--fit-inset-bottom', `${insetBottom}px`);
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
			setFitStyles(node, 1, null, 0, 0);
			return;
		}

		/** @param {string} reference */
		const resolveReference = (reference) =>
			getComputedStyle(node).getPropertyValue(reference).trim();

		const { bleedX, bleedY, bleedLeft, bleedRight, bleedTop, bleedBottom } = getFitBleed(
			node.dataset,
			resolveReference
		);
		const { insetTop, insetBottom } = getFitInsets(node.dataset, resolveReference);

		const { scale, fittedHeight } = getFitMetrics({
			contentWidth: content.offsetWidth,
			contentHeight: content.offsetHeight,
			availableWidth: node.clientWidth,
			availableHeight: Math.max(node.clientHeight - insetTop - insetBottom, 0),
			bleedX,
			bleedY,
			bleedLeft,
			bleedRight,
			bleedTop,
			bleedBottom
		});

		setFitStyles(node, scale, fittedHeight, insetTop, insetBottom);
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
