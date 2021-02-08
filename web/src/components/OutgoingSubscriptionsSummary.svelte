<script lang="ts">
	import { BigNumber } from 'ethers'
	import { TimeInterval } from '../types/time-intervals'

	// Data
	export let tokens = [{
		token: {
			symbol: 'strETH',
			decimals: 18
		},
		totalOutgoingRate: 0.00005e18,
		totalMaxOutgoingAmount: 0.0002e18,
		totalOutgoingSubscriptions: 3,
		totalSubscribedTo: 2
	}, {
		token: {
			symbol: 'strDAI',
			decimals: 18
		},
		totalOutgoingRate: 0.00006e18,
		totalMaxOutgoingAmount: 0.0008e18,
		totalOutgoingSubscriptions: 1,
		totalSubscribedTo: 1
	}]
	export let outgoingSubscriptions = []
	export let totalOutgoingSubscriptions = 4
	export let totalSubscribedTo = 3


	// Display options
	export let conversionCurrency: 'Original' | 'ETH' | 'DAI' | 'USD' = 'Original'
	export let timeInterval = TimeInterval.Day


	import Table from './Table.svelte'
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
</script>

<style>
	.aggregated-statistics {
		font-size: 1.1em;
	}
</style>

<div class="aggregated-statistics columns">
	<div class="boxed neumorphic">
		<span>Supporting <strong>{totalSubscribedTo}</strong> creator{totalSubscribedTo === 1 ? '' : 's'}</span>
	</div>
	<div class="boxed neumorphic">
		<span><strong>{totalOutgoingSubscriptions}</strong> active subscription{totalOutgoingSubscriptions === 1 ? '' : 's'}</span>
	</div>
</div>
<div class="boxed neumorphic column">
	<Table data={
		tokens.map(tokenData => ({
			'Asset': tokenData.token.symbol,
			'Giving': {
				token: tokenData.token.symbol,
				decimals: tokenData.token.decimals,
				tokensPerBlock: BigNumber.from(tokenData.totalOutgoingRate)
			},
			'Subscribers': tokenData.totalSubscribedTo,
			'Subscriptions': tokenData.totalOutgoingSubscriptions,
		}))
	}>
		<span slot="cell" let:key let:value>
			{#if key === 'Asset'}
				<TokenName token={value} />
			{:else if key === 'Giving'}
				<TokenRate {...value} {conversionCurrency} {timeInterval} />
			{:else}
				{value}
			{/if}
		</span>
	</Table>
</div>
