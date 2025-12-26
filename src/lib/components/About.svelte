<script lang="ts">
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
						<span class="avatar-initials">GB</span>
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
						<span class="stat-number">2+</span>
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
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-label {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(99, 102, 241, 0.1);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-accent-light);
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.about-content {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3rem;
		align-items: center;
	}

	.about-avatar {
		display: flex;
		justify-content: center;
	}

	.avatar-ring {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		padding: 4px;
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
	}

	.avatar-initials {
		font-size: 4rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.about-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.stat-item {
		padding: 1.25rem;
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-top: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.avatar-ring {
			width: 150px;
			height: 150px;
		}

		.avatar-initials {
			font-size: 3rem;
		}

		.about-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
