<script lang="ts">
	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const experiences = [
		{
			period: '2023 - Present',
			title: 'Full-Stack Developer',
			company: 'VoyceMe Inc.',
			description:
				'Integrated backend and frontend with NextJS and NestJS to boost customer satisfaction by 83%, migrated legacy code for scalability, developed a creator system enhancing content creation speed by 80% and satisfaction by 75%, and improved server cost efficiency with advanced frontend caching.'
		},
		{
			period: '2023',
			title: 'Software Engineer Intern',
			company: 'VoyceMe Inc.',
			description:
				'Implemented a CMS for admins to easily manage website settings and content, along with a plaza feature to enhance user interactions on the platform, being used by thousands of users every day.'
		},
		{
			period: '2023',
			title: 'Software Engineer Intern',
			company: 'ChatGenie.PH',
			description:
				'Successfully deployed three full-stack applications in collaboration with other interns, showcasing strong problem-solving skills by quickly resolving technical issues to maintain smooth project progression.'
		}
	];
</script>

<section {id} class="section experience">
	<div class="experience-container">
		<div class="section-header">
			<span class="section-label">Career</span>
			<h2 class="heading-lg">Work <span class="gradient-text">Experience</span></h2>
		</div>

		<div class="timeline">
			{#each experiences as exp, index}
				<div class="timeline-item" style="--delay: {index * 0.1}s">
					<div class="timeline-marker">
						<div class="marker-dot"></div>
						{#if index < experiences.length - 1}
							<div class="marker-line"></div>
						{/if}
					</div>

					<div class="timeline-content glass">
						<span class="timeline-period">{exp.period}</span>
						<h3 class="heading-md">{exp.title}</h3>
						<span class="timeline-company">{exp.company}</span>
						<p class="text-body">{exp.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.experience {
		background: var(--color-bg-secondary);
	}

	.experience-container {
		max-width: 800px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
	}

	.section-header {
		text-align: center;
		margin-bottom: clamp(1rem, 3vh, 2rem);
	}

	.section-label {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		background: rgba(99, 102, 241, 0.1);
		border-radius: 2rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-accent-light);
		margin-bottom: 0.5rem;
		letter-spacing: 0.05em;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 0.75rem;
	}

	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.marker-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		box-shadow: 0 0 15px var(--color-accent-glow);
		flex-shrink: 0;
	}

	.marker-line {
		width: 2px;
		flex: 1;
		background: linear-gradient(180deg, var(--color-accent) 0%, rgba(99, 102, 241, 0.2) 100%);
		margin-top: 0.25rem;
	}

	.timeline-content {
		padding: clamp(0.75rem, 2vh, 1.25rem);
		margin-bottom: clamp(0.5rem, 1.5vh, 1rem);
	}

	.timeline-period {
		display: inline-block;
		padding: 0.2rem 0.5rem;
		background: rgba(99, 102, 241, 0.15);
		border-radius: 1rem;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--color-accent-light);
		margin-bottom: 0.5rem;
	}

	.timeline-content .heading-md {
		margin-bottom: 0.125rem;
		font-size: clamp(1rem, 2.5vw, 1.5rem);
	}

	.timeline-company {
		display: block;
		color: var(--color-accent-light);
		font-weight: 500;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}

	.timeline-content .text-body {
		margin: 0;
		font-size: clamp(0.75rem, 1.5vw, 0.875rem);
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.timeline-item {
			grid-template-columns: 30px 1fr;
		}
	}

	/* For short screens */
	@media (max-height: 700px) {
		.section-header {
			margin-bottom: 0.75rem;
		}

		.timeline-content {
			padding: 0.625rem;
			margin-bottom: 0.375rem;
		}

		.timeline-content .text-body {
			font-size: 0.75rem;
			line-height: 1.4;
		}
	}
</style>
