<script lang="ts">
	import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fitSection } from '$lib/fit-section.js';
	import { onMount, tick } from 'svelte';
	import { getClosestProjectIndex, getProjectSnapOffset } from './projects-slider.js';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const baseProjects = [
		{
			title: 'Musebound',
			description:
				'A human-centric AI art platform designed for community collaboration, featuring seamless PayPal subscription integration and advanced generative capabilities.',
			tech: ['Next.js', 'Supabase', 'Prisma', 'Gemini', 'PayPal'],
			url: 'https://musebound.art/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/X3zokBrIWv63.png'
		},
		{
			title: 'MIDI Piano',
			description:
				'A browser-based interactive piano and MIDI player with a falling-notes visualizer. Features an 88-key playable piano, MIDI file import/export, and an AI composition sidebar powered by Gemini that generates and transforms pieces on demand.',
			tech: ['Next.js', 'React', 'Tone.js', 'Zustand', 'Gemini'],
			url: 'https://midi-piano-player.vercel.app/',
			image: 'https://b.catgirlsare.sexy/WrxX3bDhVuco.png'
		},
		{
			title: 'PulseSynth',
			description:
				'An immersive audio-reactive visualizer Chrome extension that captures browser tab audio to drive dynamic, WebGL-powered ambient glow effects across all tabs.',
			tech: ['TypeScript', 'Three.js', 'Web Audio API', 'Vite', 'GLSL'],
			url: 'https://pulse-synth.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/9v9yQFoCt1KK.png'
		},
		{
			title: 'Listify',
			description:
				'A multi-vendor e-commerce ecosystem with real-time messaging and integrated Stripe Connect, empowering sellers to manage transactions and earn effortlessly.',
			tech: ['Next.js', 'Supabase', 'Prisma', 'Stripe', 'Real-time'],
			url: 'https://listify-store.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/5UaWmVIutkT0.png'
		},
		{
			title: 'OnlyHate',
			description:
				'A Chrome extension that leverages sentiment analysis to filter YouTube comments, surfacing critical feedback and dissenting opinions by hiding positive/neutral content.',
			tech: ['TypeScript', 'Chrome MV3', 'Sentiment', 'esbuild'],
			url: 'https://only-hate.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/jrxDBAWSBCRt.png'
		},
		{
			title: 'ISR Blog',
			description:
				'A production-grade web application built with Next.js 16 and Prisma, featuring Incremental Static Regeneration (ISR) for high-performance content delivery. Showcases a modern glassmorphism UI with Tailwind CSS v4 and a dynamic multi-theme system.',
			tech: ['Next.js 16', 'Prisma', 'Tailwind CSS v4', 'Auth.js', 'ISR'],
			url: 'https://isr-blogs.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/7IHqNcj6K0KX.png'
		},
		{
			title: 'Solar 3D',
			description:
				'A stylized interactive observatory built with React 19 and Three.js. Features real-time orbital mechanics, smooth camera transitions, and a cinematic HUD.',
			tech: ['React 19', 'Three.js', 'TypeScript', 'Vite', 'Maath'],
			url: 'https://solar-visualization.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/2VQs7mcCyvta.png'
		},
		{
			title: 'Doom Scroll Infinity',
			description:
				'A desktop app for watching TikTok, Instagram, and YouTube Shorts simultaneously with synchronized scrolling, multi-column layouts, and isolated sessions.',
			tech: ['Electron', 'React', 'TypeScript', 'Vite'],
			url: 'https://doom-scroll-infinity.vercel.app/',
			image: 'https://b.catgirlsare.sexy/Qg5SjH5y_-B6.png'
		},
		{
			title: 'QuizCraft',
			description:
				'An AI-powered quiz platform where users can create, share, and take interactive quizzes on any subject. Features AI-generated questions, multiple question types, real-time grading, and a public explore feed.',
			tech: ['React', 'Django', 'TypeScript', 'Tailwind CSS', 'DRF'],
			url: 'https://quiz-forge-beta.vercel.app/?utm_source=portfolio',
			image: 'https://b.catgirlsare.sexy/e6-MSCOmItLv.png'
		}
	];

	import { themeState } from '$lib/theme.svelte';

	const projects = $derived.by(() => {
		const list = [...baseProjects];
		if (themeState.current === 'purple') {
			// Musebound (index 0) is already first in baseProjects, but let's be explicit
			const musebound = list.find((p) => p.title === 'Musebound');
			if (musebound) {
				const others = list.filter((p) => p.title !== 'Musebound');
				return [musebound, ...others];
			}
		} else {
			// Red theme: OnlyHate (index 3) first
			const onlyHate = list.find((p) => p.title === 'OnlyHate');
			if (onlyHate) {
				const others = list.filter((p) => p.title !== 'OnlyHate');
				return [onlyHate, ...others];
			}
		}
		return list;
	});

	let scrollContainer: HTMLDivElement;
	let scrollTrack: HTMLUListElement;
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);
	let activeIndex = $state(0);

	// Drag to scroll logic
	let isDragging = $state(false);
	let startX: number;
	let startScrollLeft: number;

	function handleMouseDown(e: MouseEvent) {
		if (!scrollContainer || e.button !== 0) return;

		isDragging = true;
		startX = e.pageX;
		startScrollLeft = scrollContainer.scrollLeft;
	}

	function getProjectSnapOffsets() {
		if (!scrollContainer || !scrollTrack) return [];

		const containerCenter = scrollContainer.clientWidth / 2;
		const maxScrollLeft = Math.max(scrollContainer.scrollWidth - scrollContainer.clientWidth, 0);

		return Array.from(scrollTrack.children).flatMap((child) => {
			if (!(child instanceof HTMLElement)) {
				return [];
			}

			const centeredOffset = child.offsetLeft + child.offsetWidth / 2 - containerCenter;
			return [Math.min(Math.max(centeredOffset, 0), maxScrollLeft)];
		});
	}

	async function finishDrag() {
		if (!isDragging || !scrollContainer) return;

		isDragging = false;
		await tick();

		const targetIndex = getClosestProjectIndex(scrollContainer.scrollLeft, getProjectSnapOffsets());
		scrollToIndex(targetIndex);
	}

	function handleGlobalMouseUp() {
		void finishDrag();
	}

	function handleGlobalMouseMove(e: MouseEvent) {
		if (!isDragging || !scrollContainer) return;

		e.preventDefault();
		const walk = (e.pageX - startX) * 2;
		scrollContainer.scrollLeft = startScrollLeft - walk;
	}

	function updateScrollState() {
		if (!scrollContainer) return;

		const snapOffsets = getProjectSnapOffsets();
		activeIndex = getClosestProjectIndex(scrollContainer.scrollLeft, snapOffsets);

		canScrollLeft = activeIndex > 0;
		canScrollRight = activeIndex < snapOffsets.length - 1;
	}

	function scrollToIndex(index: number) {
		if (!scrollContainer) return;

		const snapOffsets = getProjectSnapOffsets();
		scrollContainer.scrollTo({
			left: getProjectSnapOffset(index, snapOffsets),
			behavior: 'smooth'
		});
	}

	function scroll(direction: 'left' | 'right') {
		if (!scrollContainer) return;

		const targetIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;

		if (targetIndex >= 0 && targetIndex < projects.length) {
			scrollToIndex(targetIndex);
		}
	}

	onMount(() => {
		updateScrollState();
		window.addEventListener('mousemove', handleGlobalMouseMove);
		window.addEventListener('mouseup', handleGlobalMouseUp);
		window.addEventListener('resize', updateScrollState);

		return () => {
			window.removeEventListener('mousemove', handleGlobalMouseMove);
			window.removeEventListener('mouseup', handleGlobalMouseUp);
			window.removeEventListener('resize', updateScrollState);
		};
	});

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			scroll('left');
		} else if (e.key === 'ArrowRight') {
			scroll('right');
		}
	}
</script>

<section {id} class="section projects">
	<div
		class="section-fit-shell"
		use:fitSection
		data-fit-inset-top="40"
		data-fit-bleed-x="56"
		data-fit-bleed-top="40"
		data-fit-bleed-bottom="40"
	>
		<div class="section-fit-viewport">
			<div class="projects-container section-fit-content" data-fit-content>
				<div class="section-header">
					<span class="section-label">Portfolio</span>
					<h2 class="heading-lg">Featured <span class="gradient-text">Projects</span></h2>
				</div>

				<div class="slider-wrapper">
					<button
						class="slider-nav prev"
						class:hidden={!canScrollLeft}
						onclick={() => scroll('left')}
						aria-label="Previous project"
					>
						<ChevronLeft size={24} />
					</button>

					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<div
						class="projects-slider hide-scrollbar"
						class:dragging={isDragging}
						bind:this={scrollContainer}
						onscroll={updateScrollState}
						onmousedown={handleMouseDown}
						onkeydown={handleKeyDown}
						tabindex="0"
						role="region"
						aria-label="Featured projects carousel"
					>
						<ul class="projects-track" bind:this={scrollTrack} role="list">
							{#each projects as project (project.title)}
								<li class="project-card-wrapper" role="listitem">
									<div class="project-card glass">
										<div class="project-image-frame">
											<div class="project-links-top">
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													class="icon-btn-sm"
													onmousedown={(e) => e.stopPropagation()}
													aria-label={project.url.includes('github.com')
														? 'View Source on GitHub'
														: 'Visit Website'}
												>
													{#if project.url.includes('github.com')}
														<Github size={18} />
													{:else}
														<ExternalLink size={18} />
													{/if}
												</a>
											</div>

											<div class="project-image">
												<img
													src={project.image}
													alt={project.title}
													loading="lazy"
													draggable="false"
												/>
											</div>
										</div>

										<div class="project-content">
											<h3 class="project-title">
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													onmousedown={(e) => e.stopPropagation()}
												>
													{project.title}
												</a>
											</h3>
											<div class="project-tech">
												{#each project.tech as t}
													<span class="tech-badge">{t}</span>
												{/each}
											</div>
											<p class="project-description">{project.description}</p>

											<div class="project-actions">
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													class="visit-btn-overlay"
													onmousedown={(e) => e.stopPropagation()}
												>
													<span>Visit Project</span>
													<ExternalLink size={20} />
												</a>
											</div>
										</div>
									</div>
								</li>
							{/each}
						</ul>
					</div>

					<button
						class="slider-nav next"
						class:hidden={!canScrollRight}
						onclick={() => scroll('right')}
						aria-label="Next project"
					>
						<ChevronRight size={24} />
					</button>

					<div class="slider-pagination">
						{#each projects as _, i}
							<button
								class="pagination-dot"
								class:active={activeIndex === i}
								onclick={() => scrollToIndex(i)}
								aria-label={`Go to project ${i + 1}`}
							></button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.projects {
		background: transparent;
	}

	.projects-container {
		max-width: 1200px;
		width: 100%;
		padding: 0 0.5rem;
	}

	.slider-wrapper {
		position: relative;
		width: 100%;
	}

	.projects-slider {
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 0.75rem 0.2rem 3rem;
		scroll-behavior: smooth;
		margin: 0;
	}

	.projects-track {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.projects-slider.dragging {
		scroll-snap-type: none;
		scroll-behavior: auto;
		cursor: grabbing;
	}

	.project-card-wrapper {
		flex: 0 0 100%;
		scroll-snap-align: center;
		display: flex;
		justify-content: center;
		user-select: none;
	}

	.project-card {
		width: 100%;
		max-width: 900px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
		cursor: grab;
		position: relative;
		background: var(--color-panel);
	}

	.projects-slider.dragging .project-card {
		cursor: grabbing;
	}

	.project-image-frame {
		position: relative;
		padding: 1rem;
		background: var(--color-accent-soft);
		border-bottom: 3px solid var(--color-border);
	}

	.project-image {
		width: 100%;
		height: clamp(220px, 34vh, 330px);
		position: relative;
		overflow: hidden;
		border: 3px solid var(--color-border);
		background: var(--color-panel);
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-smooth);
	}

	.project-card:hover .project-image img {
		transform: scale(1.04);
	}

	.project-card:hover {
		transform: translate(-4px, -4px);
		box-shadow: 14px 14px 0 var(--color-shadow);
	}

	.project-links-top {
		position: absolute;
		top: 1.35rem;
		right: 1.35rem;
		z-index: 20;
		display: block;
	}

	.icon-btn-sm {
		width: 48px;
		height: 48px;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		color: var(--color-text-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 4px 4px 0 var(--color-shadow);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
	}

	.icon-btn-sm:hover {
		background: var(--color-accent);
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--color-shadow);
	}

	.visit-btn-overlay {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		justify-content: center;
		padding: 0.95rem 1.35rem;
		background: var(--color-accent);
		color: var(--color-text-primary);
		font-weight: 700;
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
		text-transform: uppercase;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
	}

	.visit-btn-overlay:hover {
		background: var(--color-sticker);
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--color-shadow);
	}

	.project-content {
		position: relative;
		padding: 1.25rem 1.35rem 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background: var(--color-panel);
		z-index: 1;
		min-height: 265px;
	}

	.project-title {
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-family: var(--font-body);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.06em;
		margin: 0 0 0.9rem;
		color: var(--color-text-primary);
	}

	.project-title a {
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color var(--transition-smooth);
	}

	.project-title a:hover {
		color: var(--color-accent);
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tech-badge {
		font-size: 0.76rem;
		font-weight: 800;
		padding: 0.4rem 0.7rem;
		background: var(--color-panel-strong);
		color: var(--color-text-primary);
		border: 2px solid var(--color-border);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.project-description {
		font-size: 0.98rem;
		line-height: 1.6;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.project-actions {
		display: flex;
		margin-top: 1.25rem;
	}

	.slider-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 56px;
		height: 56px;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		color: var(--color-text-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 20;
		box-shadow: var(--shadow-brutal);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
	}

	.slider-nav.hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.slider-nav:hover {
		background: var(--color-accent);
		transform: translate(-2px, calc(-50% - 2px));
		box-shadow: 8px 8px 0 var(--color-shadow);
	}

	.slider-nav.prev {
		left: -0.5rem;
	}
	.slider-nav.next {
		right: -0.5rem;
	}

	.slider-pagination {
		display: flex;
		justify-content: center;
		gap: 0.8rem;
		margin-top: 1rem;
	}

	.pagination-dot {
		width: 18px;
		height: 18px;
		background: var(--color-panel);
		border: 3px solid var(--color-border);
		padding: 0;
		cursor: pointer;
		box-shadow: 4px 4px 0 var(--color-shadow);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth),
			width var(--transition-smooth);
	}

	.pagination-dot.active {
		background: var(--color-accent);
		width: 42px;
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	@media (max-width: 968px) {
		.project-card {
			max-width: 560px;
		}

		.project-image {
			height: 240px;
		}

		.project-content {
			padding: 1.15rem;
			min-height: 300px;
		}

		.project-title {
			font-size: 1.5rem;
		}

		.slider-nav {
			display: none;
		}
	}

	@media (max-height: 750px) {
		.project-card {
			max-width: 760px;
		}

		.project-image {
			height: 200px;
		}

		.project-content {
			padding: 1rem;
		}

		.section-header {
			margin-bottom: 1.5rem;
		}
	}
</style>
