import { THEMES, getRandomTheme } from './theme.js';

export type Theme = (typeof THEMES)[number];

export { THEMES, getRandomTheme };
