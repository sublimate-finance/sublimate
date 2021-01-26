<script lang="ts">
	type LinkInfo = string | {name: string; title: string}

	export let links: LinkInfo[]

	import NavLink from './NavLink.svelte'
	import Wallet from './Wallet.svelte'
</script>

<style>
	.nav {
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);

		padding: 0 var(--space-outer);
		height: 4.5rem;

		position: sticky;
		top: 0;

		--space-inner: 2.5rem;

		/* backdrop-filter: var(--overlay-backdrop-filter); */
		background-color: rgba(255, 255, 255, 0.3);
		z-index: 1;
	}
	.nav:before {
		content: '';

		position: absolute;
		inset: 0;
		z-index: -1;

		backdrop-filter: var(--overlay-backdrop-filter);
	}

	li {
		display: flex;
		align-items: center;
		padding: 0 calc(var(--space-inner) / 2);
	}
	li:first-child {
		margin-right: auto;
	}

	li > :global(*) {
		--space-inner: 1em;
	}
	li > :global(a) {
		--border-width: 2px;
		display: flex;
		align-self: stretch;
		align-items: center;
		padding: 0 calc(var(--space-inner) / 2);
		margin: 0 calc(-0.5 * var(--border-width));
		border-bottom: var(--border-width) solid;
		border-bottom-color: transparent;
		text-decoration: none;
	}
	li > :global(a:hover) {
		border-bottom-color: currentColor;
	}
	li > :global(a.active) {
		border-bottom-color: var(--accent-color);
	}

	h1 {
		visibility: hidden;
	}
</style>

<ul class="nav">
	<li>
		<NavLink name={'Home'}>
			<div class="logo stack">
				<img src="/images/sublimate.svg" alt="Sublimate" width="150" />
				<h1>Sublimate</h1>
			</div>
		</NavLink>
	</li>
	{#each links as link}
		<li class="font-bold">
			<NavLink name={typeof link === 'string' ? link : link.name}>
				{typeof link === 'string' ? link : link.title}
			</NavLink>
		</li>
	{/each}
	<li>
		<Wallet />
	</li>
</ul>
