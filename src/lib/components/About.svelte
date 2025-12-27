<script lang="ts">
	import profileImage from '$lib/assets/gio.png';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
</script>

<section {id} class="section about">
	<div class="about-container">
		<div class="section-header">
			<span class="section-label">About Me</span>
			<h2 class="heading-lg">
				Turning Ideas Into<br /><span class="gradient-text">Digital Reality</span>
			</h2>
		</div>

		<div class="about-content">
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
					experiences. My journey in software development has equipped me with a diverse skill set
					spanning modern frontend frameworks and robust backend technologies.
				</p>
				<p class="text-body">
					I thrive on solving complex problems and turning ambitious ideas into elegant, scalable
					solutions. Whether it's optimizing performance, architecting systems, or creating
					intuitive user interfaces, I approach every challenge with creativity and precision.
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
</section>

<style>
	.about {
		background: linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
	}

	.about-container {
		max-width: 1000px;
		width: 100%;
		max-height: 90vh;
	}

	.about-content {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
	}

	.about-avatar {
		display: flex;
		justify-content: center;
	}

	.avatar-ring {
		width: clamp(120px, 20vh, 180px);
		height: clamp(120px, 20vh, 180px);
		border-radius: 50%;
		padding: 3px;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		animation: pulse-glow 3s ease-in-out infinite;
	}

	.avatar-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: var(--color-bg-secondary);
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
		gap: 0.75rem;
	}

	.about-text .text-body {
		font-size: clamp(0.8125rem, 1.5vw, 1rem);
		line-height: 1.6;
	}

	.about-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.stat-item {
		padding: clamp(0.75rem, 2vh, 1.25rem);
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: clamp(1.5rem, 4vh, 2rem);
		font-weight: 700;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		display: block;
		font-size: 0.7rem;
		color: var(--color-text-muted);
		margin-top: 0.125rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.avatar-ring {
			width: 120px;
			height: 120px;
		}

		.about-stats {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-height: 700px) {
		.section-header {
			margin-bottom: 0.75rem;
		}

		.about-text {
			gap: 0.5rem;
		}

		.about-text .text-body {
			font-size: 0.8125rem;
			line-height: 1.5;
		}

		.stat-item {
			padding: 0.625rem;
		}
	}
</style>
