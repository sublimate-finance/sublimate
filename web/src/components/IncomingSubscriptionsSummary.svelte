<script lang="ts">
	import { BigNumber } from 'ethers'
	import { TimeInterval } from '../types/time-intervals'

	// Data
	export let tokens = [{
		token: {
			symbol: 'strETH',
			decimals: 18
		},
		totalIncomingRate: 0.0001e18,
		totalMaxIncomingAmount: 0.0005e18,
		totalIncomingSubscriptions: 4,
		totalSubscribers: 3
	}, {
		token: {
			symbol: 'strDAI',
			decimals: 18
		},
		totalIncomingRate: 0.0005e18,
		totalMaxIncomingAmount: 0.0020e18,
		totalIncomingSubscriptions: 3,
		totalSubscribers: 2
	}]
	export let incomingSubscriptions = []
	export let totalIncomingSubscriptions = 7
	export let totalSubscribers = 5


	// Display options
	export let conversionCurrency: 'Original' | 'ETH' | 'DAI' | 'USD' = 'Original'
	export let timeInterval = TimeInterval.Day

	export let view: 'basic' | 'detailed' = 'detailed'
	$: isDetailed = view === 'detailed'


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
		<span><strong>{totalSubscribers}</strong> {isDetailed ? 'unique ' : ''}subscriber{totalSubscribers === 1 ? '' : 's'}</span>
	</div>
	<div class="boxed neumorphic">
		<span><strong>{totalIncomingSubscriptions}</strong> {isDetailed ? 'incoming ' : ''}subscription{totalIncomingSubscriptions === 1 ? '' : 's'}</span>
	</div>
</div>
<div class="boxed neumorphic column">
	<Table data={
		tokens.map(tokenData => ({
			'Asset': tokenData.token.symbol,
			'Earning': {
				token: tokenData.token.symbol,
				decimals: tokenData.token.decimals,
				tokensPerBlock: BigNumber.from(tokenData.totalIncomingRate)
			},
			'Subscribers': tokenData.totalSubscribers,
			...(isDetailed ? {
				'Subscriptions': tokenData.totalIncomingSubscriptions
			} : {})
		}))
	}>
		<span slot="cell" let:key let:value>
			{#if key === 'Asset'}
				<TokenName token={value} />
			{:else if key === 'Earning'}
				<TokenRate {...value} {conversionCurrency} {timeInterval} />
			{:else}
				{value}
			{/if}
		</span>
	</Table>
</div>
