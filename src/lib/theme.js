/** @type {readonly ['sunset', 'marigold', 'lagoon']} */
export const THEMES = ['sunset', 'marigold', 'lagoon'];

const MAX_RANDOM_VALUE = 0.999999;

/**
 * @param {() => number} [random]
 * @returns {(typeof THEMES)[number]}
 */
export function getRandomTheme(random = Math.random) {
	const rawIndex = Math.floor(Math.min(Math.max(random(), 0), MAX_RANDOM_VALUE) * THEMES.length);
	return THEMES[rawIndex] ?? THEMES[0];
}
