<script lang="ts">
	import {
		Atom,
		Zap as NextjsIcon,
		Flame,
		Code2,
		Wind,
		Server,
		Layers,
		Database,
		Share2,
		GitBranch,
		Box,
		Cloud,
		BrainCircuit,
		Bot,
		Terminal,
		PenTool,
		Leaf
	} from 'lucide-svelte';
	import { Gem, Coffee, Monitor, FileCode } from 'lucide-svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const skillCategories = [
		{
			name: 'Frontend',
			skills: [
				{ name: 'React', icon: Atom },
				{ name: 'Next.js', icon: NextjsIcon },
				{ name: 'Svelte', icon: Flame },
				{ name: 'Vue', icon: Monitor },
				{ name: 'TypeScript', icon: Code2 },
				{ name: 'Tailwind CSS', icon: Wind }
			]
		},
		{
			name: 'Backend',
			skills: [
				{ name: 'Node.js', icon: Server },
				{ name: 'NestJS', icon: Layers },
				{ name: 'Python', icon: FileCode },
				{ name: 'Java', icon: Coffee },
				{ name: 'Spring Boot', icon: Leaf },
				{ name: 'Laravel', icon: Box },
				{ name: 'Ruby', icon: Gem },
				{ name: 'Prisma', icon: Database },
				{ name: 'PostgreSQL', icon: Database },
				{ name: 'MongoDB', icon: Database },
				{ name: 'REST APIs', icon: Share2 }
			]
		},
		{
			name: 'AI & Ecosystem',
			skills: [
				{ name: 'Claude Code', icon: Bot },
				{ name: 'Gemini CLI', icon: Terminal },
				{ name: 'Figma', icon: PenTool },
				{ name: 'Docker/AWS', icon: Cloud },
				{ name: 'Git', icon: GitBranch }
			]
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
							<div class="skill-tag" style="--skill-delay: {skillIndex * 0.05}s">
								<skill.icon size={16} class="skill-icon" strokeWidth={2} />
								{skill.name}
							</div>
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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(var(--color-accent-base), 0.1);
		border: 1px solid rgba(var(--color-accent-base), 0.2);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-primary);
		transition: all var(--transition-smooth);
	}

	:global(.skill-icon) {
		color: var(--color-accent-light);
		flex-shrink: 0;
	}

	.skill-tag:hover {
		background: rgba(var(--color-accent-base), 0.2);
		border-color: rgba(var(--color-accent-base), 0.4);
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

	@media (max-height: 700px) {
		.skills-grid {
			gap: 0.75rem;
		}
		.skill-category {
			padding: 0.75rem;
		}
		.category-title {
			margin-bottom: 0.75rem;
		}
		.skills-note {
			margin-top: 1rem;
		}
	}
</style>
