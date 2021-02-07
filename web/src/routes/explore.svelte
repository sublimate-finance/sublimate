<script lang="ts">
	import { creators } from '../stores/creators'
	import CreatorCards from '../components/CreatorCards.svelte'
</script>

<style>
	.explore :global(.creator-cards) {
		font-size: 0.9em;
	}
</style>

<section class="explore">
	<h1>Explore Creators</h1>
	<CreatorCards {creators} />
</section>
