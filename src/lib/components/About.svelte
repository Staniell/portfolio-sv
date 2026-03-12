<script lang="ts">
	import profileImage from '$lib/assets/gio.png';
	import { fitSection } from '$lib/fit-section.js';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
</script>

<section {id} class="section about">
	<div class="section-fit-shell" use:fitSection>
		<div class="section-fit-viewport">
			<div class="about-container section-fit-content" data-fit-content>
				<div class="section-header">
					<span class="section-label">About Me</span>
					<h2 class="heading-lg">
						Turning Ideas Into<br /><span class="gradient-text">Digital Reality</span>
					</h2>
				</div>

				<div class="about-content glass">
					<div class="about-avatar">
						<div class="avatar-ring">
							<div class="avatar-inner">
								<img src={profileImage} alt="Gio Staniell Belolo" class="avatar-img" />
							</div>
						</div>
					</div>

					<div class="about-text">
						<p class="text-body">
							I'm a Full-Stack Software Developer with a passion for crafting exceptional digital
							experiences. My journey in software development has equipped me with a diverse skill
							set spanning modern frontend frameworks and robust backend technologies.
						</p>
						<p class="text-body">
							I thrive on solving complex problems and turning ambitious ideas into elegant,
							scalable solutions. Whether it's optimizing performance, architecting systems, or
							creating intuitive user interfaces, I approach every challenge with creativity and
							precision.
						</p>

						<div class="about-stats">
							<div class="stat-item glass">
								<span class="stat-number">3+</span>
								<span class="stat-label">Years Experience</span>
							</div>
							<div class="stat-item glass">
								<span class="stat-number">10+</span>
								<span class="stat-label">Projects Completed</span>
							</div>
							<div class="stat-item glass">
								<span class="stat-number">5+</span>
								<span class="stat-label">Technologies</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: transparent;
	}

	.about-container {
		max-width: 1080px;
		width: 100%;
	}

	.about-content {
		display: grid;
		grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: stretch;
		padding: clamp(1.25rem, 3vw, 2rem);
		background: var(--color-panel);
	}

	.about-avatar {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar-ring {
		width: min(100%, 250px);
		aspect-ratio: 1;
		padding: 0.85rem;
		background: var(--color-accent);
		border: 3px solid var(--color-border);
		box-shadow: var(--shadow-brutal-lg);
		transform: rotate(-2deg);
	}

	.avatar-inner {
		width: 100%;
		height: 100%;
		background: var(--color-panel-strong);
		border: 3px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.about-text .text-body {
		font-size: clamp(0.96rem, 1.4vw, 1.05rem);
		line-height: 1.7;
	}

	.about-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.stat-item {
		padding: clamp(0.9rem, 2vh, 1.2rem);
		text-align: center;
		background: var(--color-panel-strong);
	}

	.stat-number {
		display: block;
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 3vh, 1.85rem);
		font-weight: 900;
		letter-spacing: -0.12em;
		color: var(--color-accent);
	}

	.stat-label {
		display: block;
		font-size: 0.74rem;
		font-weight: 800;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.avatar-ring {
			width: min(220px, 100%);
			transform: none;
		}

		.about-stats {
			grid-template-columns: 1fr;
		}
	}

	@media (max-height: 700px) {
		.section-header {
			margin-bottom: 0.75rem;
		}

		.about-text {
			gap: 0.75rem;
		}

		.about-text .text-body {
			font-size: 0.9rem;
			line-height: 1.5;
		}

		.stat-item {
			padding: 0.75rem;
		}
	}
</style>
