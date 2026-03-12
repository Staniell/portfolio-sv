<script lang="ts">
	let { theme }: { theme: string } = $props();

	const ACCENTS: Record<string, string> = {
		sunset: '%23ea6043',
		marigold: '%23e0a020',
		lagoon: '%23259e98'
	};

	const STICKERS: Record<string, string> = {
		sunset: '%23ffd166',
		marigold: '%23ffbf69',
		lagoon: '%237bdff2'
	};

	const DEFAULT_ACCENT = '%23ff5a36';
	const DEFAULT_STICKER = '%23ffe16a';
	const STROKE = '%23111111';

	function arrowSvg(fill: string) {
		return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='28' viewBox='0 0 22 28'><path d='M3 1L3 22L8 17L12.5 26L15.5 24.5L11 15.5L19 15.5Z' fill='${fill}' stroke='${STROKE}' stroke-width='2.5' stroke-linejoin='miter'/></svg>`;
	}

	function handSvg(fill: string) {
		return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='21' height='26' viewBox='0 0 21 26'><path d='M7 1L10 1L10 10L11 10L11 4L14 4L14 10L19 10L19 24L2 24L2 14L4 14L4 10L7 10Z' fill='${fill}' stroke='${STROKE}' stroke-width='2' stroke-linejoin='miter'/></svg>`;
	}

	function textSvg() {
		return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24'><path d='M3 1L13 1L13 4L10 4L10 20L13 20L13 23L3 23L3 20L6 20L6 4L3 4Z' fill='${STROKE}'/></svg>`;
	}

	function grabSvg(fill: string) {
		return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25'><path d='M5 9L5 4L8 4L8 1L11 1L11 4L13 4L13 1L16 1L16 4L19 4L19 9L21 11L21 23L3 23L3 11Z' fill='${fill}' stroke='${STROKE}' stroke-width='1.5' stroke-linejoin='miter'/></svg>`;
	}

	function grabbingSvg(fill: string) {
		return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='22' viewBox='0 0 24 22'><path d='M4 8L4 5L8 5L8 3L11 3L11 5L13 5L13 3L16 3L16 5L20 5L20 8L22 10L22 20L2 20L2 10Z' fill='${fill}' stroke='${STROKE}' stroke-width='1.5' stroke-linejoin='miter'/></svg>`;
	}

	let cursorCss = $derived.by(() => {
		const accent = ACCENTS[theme] ?? DEFAULT_ACCENT;
		const sticker = STICKERS[theme] ?? DEFAULT_STICKER;

		const defaultCursor = `url("${arrowSvg(accent)}") 3 1, default`;
		const pointerCursor = `url("${handSvg(sticker)}") 8 1, pointer`;
		const textCursor = `url("${textSvg()}") 8 12, text`;
		const grabCursor = `url("${grabSvg(accent)}") 12 12, grab`;
		const grabbingCursor = `url("${grabbingSvg(accent)}") 12 10, grabbing`;

		return `
@media (pointer: fine) {
  .app-shell {
    --cursor-pointer: ${pointerCursor};
    --cursor-text: ${textCursor};
    --cursor-grab: ${grabCursor};
    --cursor-grabbing: ${grabbingCursor};
    cursor: ${defaultCursor};
  }

  .app-shell a[href] {
    cursor: var(--cursor-pointer);
  }

  .app-shell input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]),
  .app-shell textarea,
  .app-shell [contenteditable="true"] {
    cursor: var(--cursor-text);
  }
}
		`.trim();
	});

	$effect(() => {
		let style = document.getElementById('neo-cursors') as HTMLStyleElement | null;
		if (!style) {
			style = document.createElement('style');
			style.id = 'neo-cursors';
			document.head.appendChild(style);
		}
		style.textContent = cursorCss;

		return () => {
			document.getElementById('neo-cursors')?.remove();
		};
	});
</script>
