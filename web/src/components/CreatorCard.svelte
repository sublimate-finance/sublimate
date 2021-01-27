<script lang="ts">
	export let name: string
	export let summary: string
	export let image: string | URL

	export let incomingSubscriptionsAggregateData = {
		token: 'ETH',
		incomingRate: 100,
		subscriberCount: 10,
	}

	export let incomingSubscriptionsByAssets = [{
		token: 'ETH',
		incomingRate: 100,
		subscriberCount: 10,
	}, {
		token: 'DAI',
		incomingRate: 10,
		subscriberCount: 5,
	}]

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
		return amount.toFixed(3)
		// return `${amount.toFixed(3)} ${baseCurrency}/${timeInterval}`
	}

	$: tableData = incomingSubscriptionsByAssets.map(row => {
		const value = row.token
		return {
			'Asset': row.token,
			'Earning': convertTokenRate(row.token, row.incomingRate, timeInterval, baseCurrency),
			'Subscribers': row.subscriberCount
		}
	})


	// Display options
	export let timeInterval: 'block' | 'day' | 'month' | 'year' = 'day'
	export let baseCurrency = 'ETH'


	import Table from './Table.svelte'
	import TokenName from './TokenName.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	.creator-card {
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
</style>

<article class="creator-card card">
	<img src={image.toString()} alt="name" width="100" />
	<h3>{name}</h3>
	<h4 class="summary">{summary}</h4>
	<div class="columns creators">
		<div class="boxed neumorphic">
			≈ <TokenValue value={convertTokenRate(incomingSubscriptionsAggregateData.token, incomingSubscriptionsAggregateData.incomingRate, timeInterval, baseCurrency)} token={baseCurrency} rateInterval={timeInterval} />
			<!-- <span><strong>{incomingRate} {incomingToken}</strong>/month</span> -->
		</div>
		<div class="boxed neumorphic">
			<strong>{incomingSubscriptionsAggregateData.subscriberCount}</strong> subscriber{incomingSubscriptionsAggregateData.subscriberCount === 1 ? '' : 's'}
		</div>
	</div>
	<div class="boxed neumorphic column">
		<Table data={tableData}>
			<span slot="cell" let:key let:value>
				{#if key === 'Asset'}
					<TokenName token={value} />
				{:else if key === 'Earning'}
					≈ <TokenValue value={value} token={baseCurrency} rateInterval={timeInterval} />
				{:else}
					{value}
				{/if}
			</span>
		</Table>
	</div>
</article>
