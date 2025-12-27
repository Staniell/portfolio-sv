<script lang="ts">
	import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const projects = [
		{
			title: 'Musebound',
			description:
				'A human-centric AI art platform designed for community collaboration, featuring seamless PayPal subscription integration and advanced generative capabilities.',
			tech: ['Next.js', 'Supabase', 'Gemini', 'PayPal'],
			url: 'https://musebound.art/',
			image: 'https://b.catgirlsare.sexy/ybQH6ZlcwZIJ.png'
		},
		{
			title: 'Listify',
			description:
				'A multi-vendor e-commerce ecosystem with real-time messaging and integrated Stripe Connect, empowering sellers to manage transactions and earn effortlessly.',
			tech: ['Next.js', 'Supabase', 'Stripe', 'Real-time'],
			url: 'https://listify-store.vercel.app/',
			image: 'https://b.catgirlsare.sexy/mAYxU8KXKapW.png'
		},
		{
			title: 'OnlyHate',
			description:
				'A Chrome extension that leverages sentiment analysis to filter YouTube comments, surfacing critical feedback and dissenting opinions by hiding positive/neutral content.',
			tech: ['TypeScript', 'Chrome MV3', 'Sentiment', 'esbuild'],
			url: 'https://github.com/Staniell/OnlyHate',
			image: 'https://b.catgirlsare.sexy/JLsX63WBLP9_.png'
		}
	];

	let scrollContainer: HTMLUListElement;
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);
	let activeIndex = $state(0);

	// Drag to scroll logic
	let isDragging = $state(false);
	let startX: number;
	let scrollLeft: number;

	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		startX = e.pageX - scrollContainer.offsetLeft;
		scrollLeft = scrollContainer.scrollLeft;
	}

	function handleMouseLeave() {
		isDragging = false;
	}

	function handleMouseUp() {
		if (!isDragging) return;
		isDragging = false;

		// Manually trigger smooth snap to nearest card
		const width = scrollContainer.clientWidth;
		const targetIndex = Math.round(scrollContainer.scrollLeft / width);
		scrollToIndex(targetIndex);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollContainer.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainer.scrollLeft = scrollLeft - walk;
	}

	function updateScrollState() {
		if (!scrollContainer) return;

		// Calculate active index based on scroll position
		const width = scrollContainer.clientWidth;
		activeIndex = Math.round(scrollContainer.scrollLeft / width);

		// Update controls based on index for reliable visibility
		canScrollLeft = activeIndex > 0;
		canScrollRight = activeIndex < projects.length - 1;
	}

	function scrollToIndex(index: number) {
		if (!scrollContainer) return;
		const width = scrollContainer.clientWidth;
		scrollContainer.scrollTo({
			left: index * width,
			behavior: 'smooth'
		});
	}

	function scroll(direction: 'left' | 'right') {
		const width = scrollContainer.clientWidth;
		const targetIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;

		if (targetIndex >= 0 && targetIndex < projects.length) {
			scrollToIndex(targetIndex);
		}
	}

	onMount(() => {
		updateScrollState();
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
	<div class="projects-container">
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

			<ul
				class="projects-slider hide-scrollbar"
				class:dragging={isDragging}
				bind:this={scrollContainer}
				onscroll={updateScrollState}
				onmousedown={handleMouseDown}
				onmouseleave={handleMouseLeave}
				onmouseup={handleMouseUp}
				onmousemove={handleMouseMove}
				onkeydown={handleKeyDown}
				tabindex="0"
				role="list"
				aria-label="Featured projects"
			>
				{#each projects as project}
					<li class="project-card-wrapper" role="listitem">
						<div class="project-card glass">
							<div class="project-image">
								<img src={project.image} alt={project.title} loading="lazy" draggable="false" />
								<div class="image-overlay">
									<div class="project-links">
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											class="icon-btn"
											aria-label={project.url.includes('github.com')
												? 'View Source on GitHub'
												: 'Visit Website'}
										>
											{#if project.url.includes('github.com')}
												<Github size={20} />
											{:else}
												<ExternalLink size={20} />
											{/if}
										</a>
									</div>
								</div>
							</div>

							<div class="project-content">
								<h3 class="project-title">{project.title}</h3>
								<div class="project-tech">
									{#each project.tech as t}
										<span class="tech-badge">{t}</span>
									{/each}
								</div>
								<p class="project-description">{project.description}</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>

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
</section>

<style>
	.projects {
		background: var(--color-bg-primary);
	}

	.projects-container {
		max-width: 1200px;
		width: 100%;
		padding: 0 1rem;
	}

	.slider-wrapper {
		position: relative;
		width: 100%;
	}

	.projects-slider {
		display: flex;
		gap: 2rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 1rem 0 3rem;
		scroll-behavior: smooth;
		list-style: none;
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
		max-width: 800px;
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		overflow: hidden;
		border-radius: 1.5rem;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		cursor: grab;
	}

	.projects-slider.dragging .project-card {
		cursor: grabbing;
	}

	.project-image {
		position: relative;
		aspect-ratio: 16/10;
		overflow: hidden;
		pointer-events: none; /* Let drag work through image */
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: rgba(18, 18, 26, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: auto; /* Re-enable for buttons */
	}

	.project-card:hover .image-overlay {
		opacity: 1;
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.icon-btn {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: white;
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
	}

	.icon-btn:hover {
		transform: scale(1.1);
	}

	.project-content {
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: rgba(255, 255, 255, 0.02);
	}

	.project-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: white;
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tech-badge {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		background: rgba(99, 102, 241, 0.1);
		color: var(--color-accent-light);
		border-radius: 2rem;
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	.project-description {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text-secondary);
	}

	.slider-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 20;
		transition: all 0.3s ease;
	}

	.slider-nav.hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.slider-nav:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		box-shadow: 0 0 20px var(--color-accent-glow);
	}

	.slider-nav.prev {
		left: -1rem;
	}
	.slider-nav.next {
		right: -1rem;
	}

	.slider-pagination {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.pagination-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.pagination-dot.active {
		background: var(--color-accent-light);
		box-shadow: 0 0 10px var(--color-accent-glow);
		width: 24px;
		border-radius: 4px;
	}

	/* Hidden scrollbar but functional */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	@media (max-width: 968px) {
		.project-card {
			grid-template-columns: 1fr;
			max-width: 500px;
		}
		.project-content {
			padding: 1.5rem;
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
			max-width: 700px;
		}
		.project-content {
			padding: 1.5rem;
		}
		.section-header {
			margin-bottom: 1.5rem;
		}
	}
</style>
