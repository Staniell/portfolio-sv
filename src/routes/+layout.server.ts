import { getRandomTheme } from '$lib/theme.js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		theme: getRandomTheme()
	};
};
