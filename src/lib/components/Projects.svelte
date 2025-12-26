<script lang="ts">
	import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

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
				'A comprehensive multi-vendor e-commerce ecosystem with real-time messaging and integrated Stripe Connect, empowering sellers to manage transactions and earn effortlessly.',
			tech: ['Next.js', 'Supabase', 'Stripe', 'Real-time'],
			url: 'https://listify-store.vercel.app/',
			image: 'https://b.catgirlsare.sexy/mAYxU8KXKapW.png'
		}
	];

	let scrollContainer: HTMLDivElement;
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);

	function updateScrollState() {
		if (!scrollContainer) return;
		canScrollLeft = scrollContainer.scrollLeft > 10;
		canScrollRight =
			scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10;
	}

	function scroll(direction: 'left' | 'right') {
		const amount = scrollContainer.clientWidth * 0.8;
		scrollContainer.scrollBy({
			left: direction === 'left' ? -amount : amount,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		updateScrollState();
	});
</script>

<section {id} class="section projects">
	<div class="projects-container">
		<div class="section-header">
			<span class="section-label">Portfolio</span>
			<h2 class="heading-lg">Featured <span class="gradient-text">Projects</span></h2>
		</div>

		<div class="slider-wrapper">
			{#if canScrollLeft}
				<button
					class="slider-nav prev"
					onclick={() => scroll('left')}
					aria-label="Previous project"
				>
					<ChevronLeft size={24} />
				</button>
			{/if}

			<div
				class="projects-slider hide-scrollbar"
				bind:this={scrollContainer}
				onscroll={updateScrollState}
			>
				{#each projects as project}
					<div class="project-card-wrapper">
						<div class="project-card glass">
							<div class="project-image">
								<img src={project.image} alt={project.title} loading="lazy" />
								<div class="image-overlay">
									<div class="project-links">
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											class="icon-btn"
											aria-label="Visit Website"
										>
											<ExternalLink size={20} />
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
					</div>
				{/each}
			</div>

			{#if canScrollRight}
				<button class="slider-nav next" onclick={() => scroll('right')} aria-label="Next project">
					<ChevronRight size={24} />
				</button>
			{/if}
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

	.section-header {
		text-align: center;
		margin-bottom: clamp(2rem, 6vh, 4rem);
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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
	}

	.project-card-wrapper {
		flex: 0 0 100%;
		scroll-snap-align: center;
		display: flex;
		justify-content: center;
	}

	.project-card {
		width: 100%;
		max-width: 800px;
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		overflow: hidden;
		border-radius: 1.5rem;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.project-image {
		position: relative;
		aspect-ratio: 16/10;
		overflow: hidden;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
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
