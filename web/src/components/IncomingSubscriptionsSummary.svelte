<script lang="ts">
	import type { TableData } from '../types/table-data'
	import { averageBlocksPerTimeInterval, TimeInterval } from '../types/time-intervals'

	// Data
	// TODO: use generated types from GraphQL schema
	export let incomingSubscriptions = {
		aggregated: {
			currency: 'ETH',
			rate: 100,
			subscriberCount: 10,
		},

		aggregatedByToken: [{
			token: 'ETH',
			rate: 100,
			subscriberCount: 10,
		}, {
			token: 'DAI',
			rate: 10,
			subscriberCount: 5,
		}]
	}

	$: prices = {
		'ETH': 2000 * 1e-18,
		'DAI': 1 * 1e-18
	}
	function convertTokenRate(token, tokensPerBlock, timeInterval, baseCurrency){
		const amount = tokensPerBlock * averageBlocksPerTimeInterval[timeInterval] * prices[token]/prices[baseCurrency]
		return amount.toFixed(3)
		// return `${amount.toFixed(3)} ${baseCurrency}/${timeInterval}`
	}

	function tableAggregatedByToken(aggregatedByToken, timeInterval, baseCurrency): TableData {
		return aggregatedByToken.map(row => {
			const value = row.token
			return {
				'Asset': row.token,
				'Earning': convertTokenRate(row.token, row.rate, timeInterval, baseCurrency),
				'Subscribers': row.subscriberCount,
			}
		})
	}


	// Display options
	export let timeInterval = TimeInterval.Day
	export let baseCurrency = 'ETH'


	import Table from './Table.svelte'
	import TokenName from './TokenName.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<div class="columns">
	<div class="boxed neumorphic">
		≈ <TokenValue value={convertTokenRate(incomingSubscriptions.aggregated.currency, incomingSubscriptions.aggregated.rate, timeInterval, baseCurrency)} token={baseCurrency} rateInterval={timeInterval} />
		<!-- <span><strong>{rate} {incomingToken}</strong>/month</span> -->
	</div>
	<div class="boxed neumorphic">
		<strong>{incomingSubscriptions.aggregated.subscriberCount}</strong> subscriber{incomingSubscriptions.aggregated.subscriberCount === 1 ? '' : 's'}
	</div>
</div>
<div class="boxed neumorphic column">
	<Table data={tableAggregatedByToken(incomingSubscriptions.aggregatedByToken, timeInterval, baseCurrency)}>
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

