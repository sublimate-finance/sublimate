<script lang="ts">
	export let name: string
	export let summary: string
	export let image: string | URL

	export let incomingRate = 0
	export let incomingToken = 'ETH'
	export let subscriberCount = 0
</script>

<style>
	.creator-summary {
		--space-inner: 0.75em;
		justify-items: center;
		text-align: center;
	}

	img {
		border-radius: 50%;
	}

	.summary {
		color: var(--accent-color);
		font-weight: normal;
	}

	.creators .card {
		background: linear-gradient(#E791F522, #9C82E522);
		--space-outer: 1.5rem;
	}
</style>

<article class="creator-summary card">
	<img src={image.toString()} alt="name" width="100" />
	<h3>{name}</h3>
	<h4 class="summary">{summary}</h4>
	<div class="row creators">
		<div class="card neumorphic">
			<span><strong>{incomingRate} {incomingToken}</strong>/month</span>
		</div>
		<div class="card neumorphic">
			{subscriberCount} subscriber{subscriberCount === 1 ? '' : 's'}
		</div>
	</div>
</article>
