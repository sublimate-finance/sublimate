<script lang="ts">
	import { url, isActive } from '@roxi/routify'

	export const links = [
		['/', 'Home'],
		['/explore', 'Explore'],
		['/dashboard', 'Dashboard'],
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
    {#each links as [path, name]}
		<li class="font-bold">
			<a class="link" class:active={$isActive(path)} href={$url(path)}>
				{name}
			</a>
		</li>
    {/each}
</ul>
