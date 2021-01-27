<script lang="ts">
	type LinkInfo = string | {name: string; title: string}

	export let links: LinkInfo[]

	import NavLink from './NavLink.svelte'
</script>

<style>
	.nav {
		display: flex;
		align-items: stretch;
		margin-left: auto;
		margin-right: 1rem;
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
</style>

<ul class="nav">
	{#each links as link}
		<li class="font-bold">
			<NavLink name={typeof link === 'string' ? link : link.name}>
				{typeof link === 'string' ? link : link.title}
			</NavLink>
		</li>
	{/each}
</ul>
