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

<nav class="navigation glass">
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
		gap: 2rem;
		padding: 0.75rem 1.5rem;
		z-index: 100;
		border-radius: 2rem;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.nav-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--color-text-primary);
		position: relative;
		transition: all 0.3s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 24px;
		height: 2px;
		background: var(--color-text-primary);
		transition: all 0.3s ease;
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
	}

	.nav-link {
		padding: 0.5rem 1rem;
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		border-radius: 1rem;
		transition: all var(--transition-smooth);
	}

	.nav-link:hover {
		color: var(--color-text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-link.active {
		color: var(--color-accent-light);
		background: rgba(var(--color-accent-base), 0.15);
	}

	.nav-indicator {
		display: none;
		flex-direction: column;
		gap: 0.5rem;
	}

	.indicator-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		cursor: pointer;
		transition: all var(--transition-smooth);
		border: none;
		padding: 0;
	}

	.indicator-dot:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	.indicator-dot.active {
		background: var(--color-accent);
		box-shadow: 0 0 10px var(--color-accent-glow);
	}

	/* Right side dot indicator for desktop */
	@media (min-width: 769px) {
		.nav-indicator {
			display: flex;
			position: fixed;
			right: 1.5rem;
			top: 50%;
			transform: translateY(-50%);
			background: rgba(0, 0, 0, 0.3);
			backdrop-filter: blur(10px);
			padding: 0.75rem 0.5rem;
			border-radius: 1rem;
			border: 1px solid rgba(255, 255, 255, 0.08);
			z-index: 100;
		}
	}

	@media (max-width: 768px) {
		.navigation {
			width: calc(100% - 2rem);
			justify-content: space-between;
			padding: 0.5rem 1.25rem;
		}

		.nav-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			padding: 0;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.05);
			transition: all 0.3s ease;
		}

		.nav-toggle:hover,
		.nav-toggle[aria-expanded='true'] {
			background: rgba(var(--color-accent-base), 0.2);
			box-shadow: 0 0 15px var(--color-accent-glow);
		}

		.hamburger {
			width: 20px;
			height: 2px;
			background: var(--color-accent-light);
		}

		.hamburger::before,
		.hamburger::after {
			left: 0;
			width: 20px;
			height: 2px;
			background: var(--color-accent-light);
		}

		.hamburger::before {
			top: -6px;
		}

		.hamburger::after {
			bottom: -6px;
		}

		.nav-links {
			position: fixed;
			top: 5rem;
			left: 1rem;
			right: 1rem;
			flex-direction: column;
			background: rgba(18, 18, 26, 0.9);
			backdrop-filter: blur(25px);
			-webkit-backdrop-filter: blur(25px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 1.5rem;
			padding: 1.5rem 1rem;
			opacity: 0;
			visibility: hidden;
			transform: scale(0.95) translateY(-20px);
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
			transform: scale(1) translateY(0);
		}

		.nav-links::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 1.5rem;
			padding: 1px;
			background: linear-gradient(
				135deg,
				rgba(255, 255, 255, 0.1),
				transparent,
				rgba(var(--color-accent-base), 0.2)
			);
			-webkit-mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			-webkit-mask-composite: xor;
			mask-composite: exclude;
			pointer-events: none;
		}

		.nav-link {
			width: 100%;
			text-align: center;
			padding: 1rem;
			font-size: 1rem;
			letter-spacing: 0.05em;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 0;
		}

		.nav-link:last-child {
			border-bottom: none;
		}

		.nav-link.active {
			background: transparent;
			color: var(--color-accent);
			font-weight: 700;
		}
	}
</style>
