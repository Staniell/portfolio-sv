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
	import { fitSection } from '$lib/fit-section.js';

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

<section {id} class="section section--light skills">
	<div
		class="section-fit-shell"
		use:fitSection
		data-fit-inset-top="var(--nav-fit-inset-top)"
		data-fit-bleed-top="var(--section-fit-bleed-y)"
		data-fit-bleed-bottom="var(--section-fit-bleed-y)"
	>
		<div class="section-fit-viewport">
			<div class="skills-container section-fit-content" data-fit-content>
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
		</div>
	</div>
</section>

<style>
	.skills {
		background: transparent;
	}

	.skills-container {
		max-width: 1080px;
		width: 100%;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.skill-category {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.4rem 1.1rem 1.2rem;
		text-align: center;
		background: var(--color-panel);
	}

	.category-title {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.55rem 0.8rem;
		font-size: 0.8rem;
		font-weight: 800;
		color: var(--color-text-primary);
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		margin-bottom: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		justify-content: center;
	}

	.skill-tag {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 0.9rem;
		background: var(--color-panel-strong);
		border: 3px solid var(--color-border);
		font-size: 0.875rem;
		color: var(--color-text-primary);
		font-weight: 700;
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth);
		box-shadow: 4px 4px 0 var(--color-shadow);
	}

	:global(.skill-icon) {
		color: var(--color-accent);
		flex-shrink: 0;
	}

	.skill-tag:hover {
		background: var(--color-accent-soft);
		transform: translate(-2px, -2px) rotate(-1deg);
		box-shadow: 6px 6px 0 var(--color-shadow);
	}

	.skills-note {
		text-align: center;
		margin-top: 1.5rem;
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
			padding: 0.9rem;
		}
		.category-title {
			margin-bottom: 0.75rem;
		}
		.skills-note {
			margin-top: 1rem;
		}
	}
</style>
