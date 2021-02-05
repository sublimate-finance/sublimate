<script lang="ts">
import About from "../routes/about.svelte"

	export let segment: string

	const links = [
		['Home', '.'],
		['Explore', '/explore'],
		['Dashboard', '/dashboard']
	]
</script>

<style>
	.nav {
		display: flex;
		align-items: stretch;
	}

	li {
		display: flex;
		align-items: center;
		padding: 0 calc(var(--space-inner) / 2);
	}
	li:first-child {
		margin-right: auto;
	}

	li > * {
		--space-inner: 1em;
	}
	li > a {
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
	li > a:hover {
		border-bottom-color: currentColor;
	}
	li > a[aria-current=page] {
		border-bottom-color: var(--accent-color);
	}
</style>

<ul class="nav">
	{#each links as [name, href]}
		<li class="font-bold">
			<a {href} aria-current="{segment === href.replace(/^[./]+/, '') ? 'page' : undefined}">{name}</a>
		</li>
	{/each}
</ul>
