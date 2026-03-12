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
		background: transparent;
	}

	.experience-container {
		max-width: 920px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.experience-container {
			max-height: none;
			overflow: visible;
		}
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 1rem;
	}

	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 0.2rem;
	}

	.marker-dot {
		width: 22px;
		height: 22px;
		background: var(--color-accent);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		flex-shrink: 0;
	}

	.marker-line {
		width: 4px;
		flex: 1;
		background: var(--color-border);
		margin-top: 0.65rem;
	}

	.timeline-content {
		padding: clamp(1rem, 2vh, 1.35rem);
		margin-bottom: 0;
		background: var(--color-panel);
	}

	.timeline-period {
		display: inline-block;
		padding: 0.45rem 0.65rem;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		font-size: 0.74rem;
		font-weight: 800;
		color: var(--color-text-primary);
		margin-bottom: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.timeline-content .heading-md {
		margin-bottom: 0.35rem;
		font-size: clamp(1rem, 2.5vw, 1.5rem);
	}

	.timeline-company {
		display: block;
		color: var(--color-accent);
		font-weight: 800;
		font-size: 0.875rem;
		margin-bottom: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.timeline-content .text-body {
		margin: 0;
		font-size: clamp(0.9rem, 1.4vw, 1rem);
		line-height: 1.6;
	}

	@media (max-width: 640px) {
		.timeline-item {
			grid-template-columns: 36px 1fr;
		}
	}

	@media (max-height: 700px) {
		.section-header {
			margin-bottom: 0.75rem;
		}

		.timeline-content {
			padding: 0.8rem;
		}

		.timeline-content .text-body {
			font-size: 0.86rem;
			line-height: 1.4;
		}
	}
</style>
