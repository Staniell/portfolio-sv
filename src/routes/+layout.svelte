<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeState } from '$lib/theme.svelte';

	let { children } = $props();

	$effect(() => {
		document.body.setAttribute('data-theme', themeState.current);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div style="min-height: 100vh; display: flex; flex-direction: column;">
	{@render children()}
</div>
