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
		height: 5rem;

		position: sticky;
		top: 0;

		--space-inner: 3rem;

		backdrop-filter: var(--overlay-backdrop-filter);
		background-color: rgba(255, 255, 255, 0.2);
		z-index: 1;
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

	h1 {
		visibility: hidden;
	}
</style>

<ul class="nav">
	{#each links as link}
		<li>
			<NavLink name={typeof link === 'string' ? link : link.name}>
				{#if link === 'Home'}
					<div class="logo stack">
						<img src="/images/sublimate.svg" alt="Sublimate" width="160" />
						<h1>Sublimate</h1>
					</div>
				{:else}
					{typeof link === 'string' ? link : link.title}
				{/if}
			</NavLink>
		</li>
	{/each}
	<li>
		<Wallet />
	</li>
</ul>
