<script lang="ts">
	interface Props {
		currentSection?: string;
	}

	let { currentSection = 'hero' }: Props = $props();
	let isMenuOpen = $state(false);

	const navItems = [
		{ id: 'about', label: 'About' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleNavClick(id: string) {
		isMenuOpen = false;
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav class="navigation glass" aria-label="Section navigation">
	<a href="#hero" class="nav-logo" onclick={() => handleNavClick('hero')}>
		<span class="logo-text">GB</span>
	</a>

	<button
		class="nav-toggle"
		onclick={toggleMenu}
		aria-label="Toggle navigation"
		aria-expanded={isMenuOpen}
	>
		<span class="hamburger" class:open={isMenuOpen}></span>
	</button>

	<ul class="nav-links" class:open={isMenuOpen}>
		{#each navItems as item}
			<li>
				<button
					class="nav-link"
					class:active={currentSection === item.id}
					onclick={() => handleNavClick(item.id)}
				>
					{item.label}
				</button>
			</li>
		{/each}
	</ul>
</nav>

<div class="nav-indicator">
	{#each navItems as item}
		<button
			class="indicator-dot"
			class:active={currentSection === item.id}
			onclick={() => handleNavClick(item.id)}
			aria-label={`Go to ${item.label}`}
		></button>
	{/each}
</div>

<style>
	.navigation {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		width: min(960px, calc(100% - 2rem));
		padding: 0.85rem 1rem;
		z-index: 100;
		background: var(--color-panel);
	}

	.nav-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 64px;
		padding: 0.65rem 0.95rem;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		text-decoration: none;
	}

	.logo-text {
		font-size: 1rem;
		font-weight: 800;
		font-family: var(--font-display);
		letter-spacing: -0.12em;
		text-transform: uppercase;
	}

	.nav-toggle {
		display: none;
		background: var(--color-sticker);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 3px;
		background: var(--color-text-primary);
		position: relative;
		transition: all var(--transition-smooth);
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 24px;
		height: 3px;
		background: var(--color-text-primary);
		transition: all var(--transition-smooth);
	}

	.hamburger::before {
		top: -7px;
	}

	.hamburger::after {
		bottom: -7px;
	}

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		top: 0;
		transform: rotate(45deg);
	}

	.hamburger.open::after {
		bottom: 0;
		transform: rotate(-45deg);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.nav-link {
		padding: 0.8rem 1rem;
		background: var(--color-panel-strong);
		border: 3px solid transparent;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition:
			transform var(--transition-smooth),
			background-color var(--transition-smooth),
			border-color var(--transition-smooth),
			box-shadow var(--transition-smooth),
			color var(--transition-smooth);
		min-height: 48px;
	}

	.nav-link:hover {
		color: var(--color-text-primary);
		background: var(--color-sticker);
		border-color: var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		transform: translate(-2px, -2px);
	}

	.nav-link.active {
		color: var(--color-text-primary);
		background: var(--color-accent);
		border-color: var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
	}

	.nav-indicator {
		display: none;
		flex-direction: column;
		gap: 0.6rem;
	}

	.indicator-dot {
		width: 18px;
		height: 18px;
		background: var(--color-panel);
		cursor: pointer;
		transition:
			transform var(--transition-smooth),
			background-color var(--transition-smooth),
			box-shadow var(--transition-smooth);
		border: 3px solid var(--color-border);
		padding: 0;
		box-shadow: 4px 4px 0 var(--color-shadow);
	}

	.indicator-dot:hover {
		background: var(--color-sticker);
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--color-shadow);
	}

	.indicator-dot.active {
		background: var(--color-accent);
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--color-shadow);
	}

	@media (min-width: 769px) {
		.nav-indicator {
			display: flex;
			position: fixed;
			right: 1rem;
			top: 50%;
			transform: translateY(-50%);
			background: var(--color-panel);
			padding: 0.85rem 0.55rem;
			border: 3px solid var(--color-border);
			box-shadow: var(--shadow-brutal);
			z-index: 100;
		}
	}

	@media (max-width: 768px) {
		.navigation {
			width: calc(100% - 1rem);
			padding: 0.85rem;
		}

		.nav-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 48px;
			height: 48px;
			padding: 0;
			transition:
				transform var(--transition-smooth),
				box-shadow var(--transition-smooth),
				background-color var(--transition-smooth);
		}

		.nav-toggle:hover,
		.nav-toggle[aria-expanded='true'] {
			background: var(--color-accent);
			transform: translate(-2px, -2px);
			box-shadow: 6px 6px 0 var(--color-shadow);
		}

		.hamburger {
			width: 20px;
			height: 3px;
			background: var(--color-text-primary);
		}

		.hamburger::before,
		.hamburger::after {
			left: 0;
			width: 20px;
			height: 3px;
			background: var(--color-text-primary);
		}

		.hamburger::before {
			top: -6px;
		}

		.hamburger::after {
			bottom: -6px;
		}

		.nav-links {
			position: fixed;
			top: 5.6rem;
			left: 0.75rem;
			right: 0.75rem;
			flex-direction: column;
			align-items: stretch;
			background: var(--color-panel);
			border: 3px solid var(--color-border);
			padding: 1rem;
			opacity: 0;
			visibility: hidden;
			transform: translateY(-12px);
			transition:
				opacity var(--transition-smooth),
				visibility var(--transition-smooth),
				transform var(--transition-smooth);
			box-shadow: var(--shadow-brutal-lg);
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		.nav-link {
			width: 100%;
			text-align: center;
			padding: 1rem;
			font-size: 0.95rem;
			border-color: var(--color-border);
			box-shadow: 4px 4px 0 var(--color-shadow);
		}

		.nav-link.active {
			background: var(--color-accent);
			color: var(--color-text-primary);
		}
	}
</style>
