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
		border-bottom: 1px solid;

		padding: 0 var(--space-outer);

		--space-inner: 2rem;
	}
	li {
		display: flex;
		align-items: center;
		padding: calc(var(--space-inner) / 2);
	}
	li:first-child {
		margin-right: auto;
	}
	li > :global(*) {
		--space-inner: 1em;
	}
</style>

<ul class="nav">
	{#each links as link}
		<li>
			<NavLink name={typeof link === 'string' ? link : link.name}>
				{#if link === 'Home'}
					<div class="logo">
						<img src="/images/logo.svg" alt="Sublimate" width="60" />
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
