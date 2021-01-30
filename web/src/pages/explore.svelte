<script lang="ts">
	import { creators } from '../stores/creators'
	import CreatorCards from '../components/CreatorCards.svelte'
</script>

<section>
	<h1>Explore Creators</h1>
	<CreatorCards {creators} />
</section>
