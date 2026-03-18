<script lang="ts">
	import { fitSection } from '$lib/fit-section.js';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const socials = [
		{
			name: 'GitHub',
			icon: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
			url: 'https://github.com/staniell'
		},
		{
			name: 'LinkedIn',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
			url: 'https://www.linkedin.com/in/gio-staniell-belolo'
		},
		{
			name: 'Email',
			icon: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
			url: 'mailto:giostaniell14@gmail.com'
		}
	];
</script>

<section {id} class="section section--dark contact">
	<div
		class="section-fit-shell"
		use:fitSection
		data-fit-inset-top="var(--nav-fit-inset-top)"
		data-fit-bleed-top="var(--section-fit-bleed-y)"
		data-fit-bleed-bottom="var(--section-fit-bleed-y)"
	>
		<div class="section-fit-viewport">
			<div class="contact-shell section-fit-content" data-fit-content>
				<div class="contact-container glass">
					<div class="section-header">
						<span class="section-label">Get in Touch</span>
						<h2 class="heading-lg">Let's <span class="gradient-text">Connect</span></h2>
						<p class="text-body contact-description">
							I'm always open to discussing new projects, creative ideas, or opportunities to be
							part of your vision.
						</p>
					</div>

					<div class="contact-cta">
						<a href="mailto:giostaniell14@gmail.com" class="btn-primary" data-sveltekit-reload>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
								/>
							</svg>
							<span>Send me an Email</span>
						</a>
					</div>

					<div class="socials">
						{#each socials as social}
							<a
								href={social.url}
								class="social-link glass"
								target={social.url.startsWith('mailto:') ? undefined : '_blank'}
								rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
								data-sveltekit-reload={social.url.startsWith('mailto:') ? '' : undefined}
								aria-label={social.name}
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
									<path d={social.icon} />
								</svg>
								<span class="social-name">{social.name}</span>
							</a>
						{/each}
					</div>
				</div>

				<footer class="footer">
					<p class="text-small">© 2025 Gio Staniell Belolo. All rights reserved.</p>
				</footer>
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		background: transparent;
	}

	.contact-shell {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.contact-container {
		max-width: 760px;
		width: 100%;
		text-align: center;
		padding: clamp(1.4rem, 4vw, 2.3rem);
		background: var(--color-panel);
	}

	.contact-description {
		max-width: 540px;
		margin: 1rem auto 0;
	}

	.contact-cta {
		margin: 2rem 0;
	}

	.socials {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.social-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.2rem;
		min-width: 132px;
		background: var(--color-panel-strong);
		color: var(--color-text-secondary);
		transition:
			transform var(--transition-smooth),
			box-shadow var(--transition-smooth),
			background-color var(--transition-smooth),
			color var(--transition-smooth);
	}

	.social-link:hover {
		color: var(--color-text-primary);
		background: var(--color-accent-soft);
		transform: translate(-2px, -2px);
		box-shadow: 8px 8px 0 var(--color-shadow);
	}

	.social-name {
		font-size: 0.76rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.footer {
		text-align: center;
	}

	.footer :global(.text-small) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.8rem;
		background: var(--color-panel);
		border: 3px solid var(--color-border);
		box-shadow: 4px 4px 0 var(--color-shadow);
		color: var(--color-text-secondary);
	}

	@media (max-width: 640px) {
		.socials {
			flex-direction: column;
			align-items: stretch;
		}

		.footer {
			margin-top: 1.5rem;
		}

		.social-link {
			width: 100%;
			max-width: none;
			flex-direction: row;
			justify-content: center;
		}
	}
</style>
