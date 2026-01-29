export type Theme = 'red' | 'purple';

class ThemeState {
	current = $derived.by<Theme>(() => {
		const day = new Date().getDay();
		// 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
		// Red: Mon(1), Wed(3), Fri(5), Sun(0)
		// Purple: Tue(2), Thu(4), Sat(6)
		const redDays = [0, 1, 3, 5];
		return redDays.includes(day) ? 'red' : 'purple';
	});
}

export const themeState = new ThemeState();
