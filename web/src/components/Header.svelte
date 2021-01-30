<script lang="ts">
	import Logo from './Logo.svelte'
	import Nav from './Nav.svelte'
	import Wallet from './Wallet.svelte'
</script>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);

		padding: 0 var(--space-outer);
		height: 4.5rem;

		position: sticky;
		top: 0;

		gap: var(--space-inner);
		--space-inner: 2.25rem;

		/* backdrop-filter: var(--overlay-backdrop-filter); */
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 1;
	}
	header:before {
		content: '';

		position: absolute;
		inset: 0;
		z-index: -1;

		backdrop-filter: var(--overlay-backdrop-filter);
	}

	header :global(.nav) {
		margin-left: auto;
		align-self: stretch;
	}
</style>

<header>
	<a href="./">
		<Logo />
	</a>
	<Nav />
	<Wallet />
</header>
