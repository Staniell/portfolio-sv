<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	function scrollToNext() {
		const about = document.getElementById('about');
		about?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section {id} class="section hero">
	<div class="hero-layout">
		<div class="hero-content glass">
			<div class="hero-badge">Full-Stack Software Developer</div>
			<h1 class="heading-xl">Gio Staniell<br /><span class="gradient-text">Belolo</span></h1>
			<p class="text-body hero-description">
				I'm passionate about creating efficient, scalable, and user-friendly web applications. With
				expertise in both front-end and back-end technologies, I bring ideas to life through code.
			</p>
			<div class="hero-cta">
				<a href="#contact" class="btn-primary">Get in Touch</a>
				<a href="#experience" class="btn-secondary">View Experience</a>
			</div>
		</div>

		<div class="hero-side">
			<div class="hero-note glass">
				<span class="hero-note-label">Build Focus</span>
				<p>Efficient systems, scalable architecture, and interfaces that feel easy to use.</p>
			</div>

			<div class="hero-stats">
				<div class="hero-stat glass">
					<span class="hero-stat-number">3+</span>
					<span class="hero-stat-label">Years</span>
				</div>
				<div class="hero-stat glass">
					<span class="hero-stat-number">10+</span>
					<span class="hero-stat-label">Projects</span>
				</div>
				<div class="hero-stat glass">
					<span class="hero-stat-number">5+</span>
					<span class="hero-stat-label">Stacks</span>
				</div>
			</div>
		</div>
	</div>

	<button class="scroll-indicator" onclick={scrollToNext} aria-label="Scroll to next section">
		<ChevronDown size={30} class="scroll-arrow-icon" />
	</button>

	<div class="hero-block hero-block-primary"></div>
	<div class="hero-block hero-block-secondary"></div>
</section>

<style>
	.hero {
		background: transparent;
	}

	.hero-layout {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.75fr);
		gap: clamp(1rem, 3vw, 1.75rem);
		align-items: stretch;
		width: min(var(--max-content-width), 100%);
		z-index: 1;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: clamp(1.5rem, 4vw, 2.75rem);
		text-align: left;
		background: var(--color-panel);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		font-size: 0.8rem;
		font-weight: 800;
		font-family: var(--font-display);
		color: var(--color-text-primary);
		margin-bottom: 1.25rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.hero-content :global(.heading-xl) {
		max-width: 12ch;
	}

	.hero-description {
		max-width: 58ch;
		margin: 1.5rem 0 0;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 1.6rem;
		background: var(--color-panel-strong);
		color: var(--color-text-primary);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		border: 3px solid var(--color-border);
		box-shadow: var(--shadow-brutal);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
		min-height: 52px;
	}

	.btn-secondary:hover {
		transform: translate(-2px, -2px);
		box-shadow: 8px 8px 0 var(--color-shadow);
		background: var(--color-sticker);
	}

	.hero-side {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero-note,
	.hero-stat {
		background: var(--color-panel);
	}

	.hero-note {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.5rem;
	}

	.hero-note-label {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		padding: 0.45rem 0.65rem;
		background: var(--color-accent);
		border: 3px solid var(--color-border);
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.hero-note p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.55;
		color: var(--color-text-primary);
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.hero-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 1.25rem 0.75rem;
		text-align: center;
	}

	.hero-stat-number {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2vw, 1.6rem);
		font-weight: 900;
		letter-spacing: -0.12em;
		color: var(--color-accent);
	}

	.hero-stat-label {
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-secondary);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		box-shadow: var(--shadow-brutal);
		cursor: pointer;
		padding: 0.65rem;
		z-index: 10;
		color: var(--color-text-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
	}

	.scroll-indicator:hover {
		background: var(--color-accent);
		transform: translate(calc(-50% - 2px), -2px);
		box-shadow: 8px 8px 0 var(--color-shadow);
	}

	:global(.scroll-arrow-icon) {
		animation: scroll-indicator 1.4s ease-in-out infinite;
	}

	@keyframes scroll-indicator {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}

	.hero-block {
		position: absolute;
		border: 3px solid var(--color-border);
		z-index: 0;
		pointer-events: none;
	}

	.hero-block-primary {
		top: 6.5rem;
		right: clamp(1rem, 5vw, 4rem);
		width: clamp(72px, 8vw, 110px);
		height: clamp(72px, 8vw, 110px);
		background: var(--color-accent);
		box-shadow: var(--shadow-brutal);
	}

	.hero-block-secondary {
		bottom: 5rem;
		left: clamp(1rem, 4vw, 3rem);
		width: clamp(52px, 6vw, 84px);
		height: clamp(52px, 6vw, 84px);
		background: var(--color-sticker);
		box-shadow: var(--shadow-brutal);
	}

	@media (max-width: 900px) {
		.hero-layout {
			grid-template-columns: 1fr;
		}

		.hero-content,
		.hero-side {
			max-width: 760px;
			width: 100%;
		}
	}

	@media (max-width: 640px) {
		.hero-content {
			padding: 1.25rem;
		}

		.hero-cta {
			flex-direction: column;
			align-items: stretch;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}

		.hero-stats {
			grid-template-columns: 1fr;
		}

		.hero-content :global(.heading-xl) {
			max-width: none;
		}

		.hero-block-primary {
			right: 0.5rem;
		}

		.hero-block-secondary {
			left: 0.5rem;
		}
	}
</style>
