<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import CursorTheme from '$lib/components/CursorTheme.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	$effect(() => {
		document.body.setAttribute('data-theme', data.theme);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<CursorTheme theme={data.theme} />

<div class="app-shell" data-theme={data.theme}>
	{@render children()}
</div>
