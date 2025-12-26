<script lang="ts">
	interface Props {
		currentSection?: string;
	}

	let { currentSection = 'hero' }: Props = $props();
	let isMenuOpen = $state(false);

	const navItems = [
		{ id: 'hero', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'experience', label: 'Experience' },
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

	<div class="nav-indicator">
		{#each navItems as item}
			<span
				class="indicator-dot"
				class:active={currentSection === item.id}
				onclick={() => handleNavClick(item.id)}
				role="button"
				tabindex="0"
				aria-label={`Go to ${item.label}`}
			></span>
		{/each}
	</div>
</nav>

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
		background: rgba(99, 102, 241, 0.15);
	}

	.nav-indicator {
		display: none;
		flex-direction: column;
		gap: 0.5rem;
	}

	.indicator-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		cursor: pointer;
		transition: all var(--transition-smooth);
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
		}
	}

	@media (max-width: 768px) {
		.navigation {
			width: calc(100% - 2rem);
			justify-content: space-between;
		}

		.nav-toggle {
			display: block;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			margin-top: 0.5rem;
			flex-direction: column;
			background: rgba(18, 18, 26, 0.98);
			backdrop-filter: blur(20px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1rem;
			padding: 1rem;
			opacity: 0;
			visibility: hidden;
			transform: translateY(-10px);
			transition: all 0.3s ease;
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		.nav-link {
			width: 100%;
			text-align: center;
			padding: 0.75rem 1rem;
		}
	}
</style>
