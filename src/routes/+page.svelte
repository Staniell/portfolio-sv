<script lang="ts">
	import { Hero, About, Experience, Projects, Skills, Contact, Navigation } from '$lib';
	import { getDesktopWheelAction } from '$lib/desktop-scroll.js';
	import { getClosestSectionIndex } from '$lib/section-navigation.js';
	import { onMount } from 'svelte';

	let currentSection = $state('hero');
	let sections: string[] = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
	let isScrolling = $state(false);
	let scrollUnlockTimeout: number | undefined;

	function getSectionElement(id: string) {
		const element = document.getElementById(id);
		return element instanceof HTMLElement ? element : null;
	}

	function scrollToSection(index: number) {
		if (index < 0 || index >= sections.length || isScrolling) return;

		const element = getSectionElement(sections[index]);
		if (!element) return;

		isScrolling = true;
		currentSection = sections[index];
		element.scrollIntoView({ behavior: 'smooth' });
		scheduleScrollUnlock();
	}

	function scheduleScrollUnlock() {
		if (scrollUnlockTimeout !== undefined) {
			window.clearTimeout(scrollUnlockTimeout);
		}

		scrollUnlockTimeout = window.setTimeout(() => {
			isScrolling = false;
			scrollUnlockTimeout = undefined;
		}, 800);
	}

	function handleWheel(event: WheelEvent) {
		const action = getDesktopWheelAction({
			innerWidth: window.innerWidth,
			isScrolling,
			deltaY: event.deltaY
		});

		if (!action.shouldPreventDefault) return;

		event.preventDefault();

		if (action.sectionDelta === 0) {
			if (isScrolling) {
				scheduleScrollUnlock();
			}

			return;
		}

		const currentIndex = getClosestSectionIndex({
			scrollY: window.scrollY,
			viewportHeight: window.innerHeight,
			sections: sections.flatMap((sectionId) => {
				const element = getSectionElement(sectionId);
				if (!element) return [];

				return [{ top: element.offsetTop, height: element.offsetHeight }];
			})
		});

		scrollToSection(currentIndex + action.sectionDelta);
	}

	function updateCurrentSectionFromScroll() {
		const currentIndex = getClosestSectionIndex({
			scrollY: window.scrollY,
			viewportHeight: window.innerHeight,
			sections: sections.flatMap((sectionId) => {
				const element = getSectionElement(sectionId);
				if (!element) return [];

				return [{ top: element.offsetTop, height: element.offsetHeight }];
			})
		});

		currentSection = sections[currentIndex] ?? sections[0];
	}

	onMount(() => {
		updateCurrentSectionFromScroll();

		// Add wheel event listener with passive: false to allow preventDefault
		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('scroll', updateCurrentSectionFromScroll, { passive: true });
		window.addEventListener('resize', updateCurrentSectionFromScroll);

		return () => {
			if (scrollUnlockTimeout !== undefined) {
				window.clearTimeout(scrollUnlockTimeout);
			}

			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('scroll', updateCurrentSectionFromScroll);
			window.removeEventListener('resize', updateCurrentSectionFromScroll);
		};
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
		href="https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&family=Public+Sans:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navigation {currentSection} />

<main class="portfolio-container">
	<Hero id="hero" />
	<About id="about" />
	<Experience id="experience" />
	<Projects id="projects" />
	<Skills id="skills" />
	<Contact id="contact" />
</main>

<style>
	.portfolio-container {
		width: 100%;
	}
</style>
