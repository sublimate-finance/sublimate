<script lang="ts">
	type LinkInfo = string | {name: string; title: string}

	export let links: LinkInfo[]

	import NavLink from './NavLink.svelte'
	import WalletControls from './WalletControls.svelte'
</script>

<style>
	.nav {
		--space-inner: 2rem;
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid;
	}
</style>

<ul class="nav">
	{#each links as link}
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
	{/each}
	<WalletControls />
</ul>
