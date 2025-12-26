<script lang="ts">
	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const skillCategories = [
		{
			name: 'Frontend',
			skills: ['React', 'Next.js', 'Svelte', 'TypeScript', 'Tailwind CSS']
		},
		{
			name: 'Backend',
			skills: ['Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'REST APIs']
		},
		{
			name: 'Tools & Others',
			skills: ['Git', 'Docker', 'AWS', 'Figma', 'Agile']
		}
	];
</script>

<section {id} class="section skills">
	<div class="skills-container">
		<div class="section-header">
			<span class="section-label">Expertise</span>
			<h2 class="heading-lg">Technical <span class="gradient-text">Skills</span></h2>
		</div>

		<div class="skills-grid">
			{#each skillCategories as category, catIndex}
				<div class="skill-category glass" style="--delay: {catIndex * 0.1}s">
					<h3 class="category-title">{category.name}</h3>
					<div class="skills-list">
						{#each category.skills as skill, skillIndex}
							<span class="skill-tag" style="--skill-delay: {skillIndex * 0.05}s">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="skills-note">
			<p class="text-small">
				Always learning and exploring new technologies to stay ahead of the curve.
			</p>
		</div>
	</div>
</section>

<style>
	.skills {
		background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
	}

	.skills-container {
		max-width: 900px;
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

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.skill-category {
		padding: 1.5rem;
		text-align: center;
	}

	.category-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-accent-light);
		margin-bottom: 1.25rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.skill-tag {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.2);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-primary);
		transition: all var(--transition-smooth);
	}

	.skill-tag:hover {
		background: rgba(99, 102, 241, 0.2);
		border-color: rgba(99, 102, 241, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--color-accent-glow);
	}

	.skills-note {
		text-align: center;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
