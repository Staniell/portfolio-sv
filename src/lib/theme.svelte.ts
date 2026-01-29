export type Theme = 'red' | 'purple';

class ThemeState {
	current = $state<Theme>('red');

	setTheme(newTheme: Theme) {
		this.current = newTheme;
	}
}

export const themeState = new ThemeState();
