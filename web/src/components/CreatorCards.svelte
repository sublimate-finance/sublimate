<script lang="ts">
	export let creators

	import CreatorCard from './CreatorCard.svelte'
</script>

<style>
	.creator-cards {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(32em, 1fr)); */
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		--space-inner: 2.5em;
		gap: var(--space-inner);
	}
	.creator-cards > :global(*) {
		width: 28em;
	}
</style>

<div class="creator-cards">
	{#each creators as creatorInfo}
		<CreatorCard {...creatorInfo} />
	{/each}
</div>