<script lang="ts">
	export let name: string
	export let summary: string
	export let image: string | URL

	export let incomingRate = 0
	export let incomingToken = 'ETH'
	export let subscriberCount = 0

	export let subscriptionData = [{
		asset: 'ETH',
		incomingRate: 100,
		subscriberCount: 10,
	}, {
		asset: 'DAI',
		incomingRate: 10,
		subscriberCount: 5,
	}]


	export let timeInterval: 'block' | 'day' | 'month' | 'year' = 'day'
	export let baseCurrency = 'ETH'

	$: prices = {
		'ETH': 2000 * 1e-18,
		'DAI': 1 * 1e-18
	}
	$: averageBlocksPerTimeInterval = {
		'year': 1000,
		'month': 1000 / 12,
		'day': 1000 / 365.25,
		'block': 1
	}
	function convertTokenRate(token, tokensPerBlock, timeInterval, baseCurrency){
		const amount = tokensPerBlock * averageBlocksPerTimeInterval[timeInterval] * prices[baseCurrency]/prices[token]
		return `${amount.toFixed(3)} ${baseCurrency}/${timeInterval}`
	}

	$: tableData = subscriptionData.map(row => {
		const value = row.asset
		return {
			'Asset': row.asset,
			'Earning': convertTokenRate(row.asset, row.incomingRate, timeInterval, baseCurrency),
			'Subscribers': row.subscriberCount
		}
	})


	import Table from './Table.svelte'
	import TokenName from './TokenName.svelte'
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
	<Table data={tableData}>
		<div slot="cell" let:key let:value>
			{#if key === 'Asset'}
				<TokenName token={value} />
			{:else}
				{value}
			{/if}
		</div>
	</Table>
</article>
