<script lang="ts">
	import { Hero, About, Experience, Skills, Contact, Navigation } from '$lib';
	import { onMount } from 'svelte';

	let currentSection = $state('hero');
	let sections: string[] = ['hero', 'about', 'experience', 'skills', 'contact'];

	onMount(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					currentSection = entry.target.id;
				}
			});
		}, observerOptions);

		sections.forEach((section) => {
			const element = document.getElementById(section);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Gio Staniell Belolo | Full-Stack Developer</title>
	<meta
		name="description"
		content="Full-Stack Software Developer passionate about creating efficient, scalable, and user-friendly web applications."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navigation {currentSection} />

<main class="portfolio-container">
	<Hero id="hero" />
	<About id="about" />
	<Experience id="experience" />
	<Skills id="skills" />
	<Contact id="contact" />
</main>

<style>
	.portfolio-container {
		width: 100%;
	}
</style>
