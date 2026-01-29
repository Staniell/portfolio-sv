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
	<div class="hero-content">
		<div class="hero-badge">Full-Stack Software Developer</div>
		<h1 class="heading-xl">Gio Staniell<br />Belolo</h1>
		<p class="text-body hero-description">
			I'm passionate about creating efficient, scalable, and user-friendly web applications. With
			expertise in both front-end and back-end technologies, I bring ideas to life through code.
		</p>
		<div class="hero-cta">
			<a href="#contact" class="btn-primary">Get in Touch</a>
			<a href="#experience" class="btn-secondary">View Experience</a>
		</div>
	</div>

	<button class="scroll-indicator" onclick={scrollToNext} aria-label="Scroll to next section">
		<div class="scroll-container">
			<ChevronDown size={36} class="scroll-arrow-icon" />
			<div class="scroll-dot-glow"></div>
		</div>
	</button>

	<div class="hero-bg-glow"></div>
</section>

<style>
	.hero {
		background: radial-gradient(
			ellipse at center top,
			rgba(var(--color-accent-base), 0.15) 0%,
			transparent 60%
		);
	}

	.hero-content {
		max-width: 800px;
		text-align: center;
		z-index: 1;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.5rem 1.25rem;
		background: rgba(var(--color-accent-base), 0.1);
		border: 1px solid rgba(var(--color-accent-base), 0.3);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-accent-light);
		margin-bottom: 1.5rem;
		letter-spacing: 0.05em;
	}

	.hero-description {
		max-width: 600px;
		margin: 1.5rem auto 2.5rem;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.875rem 2rem;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		color: white;
		font-weight: 600;
		border-radius: 0.75rem;
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 40px var(--color-accent-glow);
		color: white;
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		padding: 0.875rem 2rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary);
		font-weight: 600;
		border-radius: 0.75rem;
		transition: all var(--transition-smooth);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 10;
		color: var(--color-text-muted);
		transition: all var(--transition-smooth);
	}

	.scroll-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.scroll-dot-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40px;
		height: 40px;
		background: var(--color-accent-glow);
		filter: blur(20px);
		border-radius: 50%;
		opacity: 0;
		transition: opacity var(--transition-smooth);
	}

	.scroll-indicator:hover {
		color: var(--color-accent-light);
		transform: translateX(-50%) translateY(5px);
	}

	.scroll-indicator:hover .scroll-dot-glow {
		opacity: 0.5;
	}

	:global(.scroll-arrow-icon) {
		animation: scroll-indicator 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		filter: drop-shadow(0 0 8px rgba(var(--color-accent-base), 0.3));
	}

	@keyframes scroll-indicator {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.5;
		}
		50% {
			transform: translateY(10px);
			opacity: 1;
		}
	}

	.hero-bg-glow {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%);
		pointer-events: none;
		opacity: 0.5;
	}

	@media (max-width: 640px) {
		.hero-cta {
			flex-direction: column;
			align-items: center;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			max-width: 280px;
			justify-content: center;
		}
	}
</style>
