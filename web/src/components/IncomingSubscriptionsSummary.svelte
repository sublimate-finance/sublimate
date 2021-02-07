<script lang="ts">
	import { BigNumber, utils } from 'ethers'
	import { averageBlocksPerTimeInterval, TimeInterval } from '../types/time-intervals'

	// Data
	// TODO: use generated types from GraphQL schema
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

	function nonStreamableToken(token){
		return token.replace(/^str/, '')
	}

	$: prices = {
		'ETH': 2000,
		'DAI': 1
	}
	function convertTokenRate(token: string, decimals: number, tokensPerBlock: BigNumber, timeInterval: TimeInterval, baseCurrency: string){
		const amount = tokensPerBlock.mul(averageBlocksPerTimeInterval[timeInterval]).mul(prices[token]).div(prices[baseCurrency])
		return utils.formatUnits(amount.toString(), decimals) // amount.toFixed(3)
		// return `${amount.toFixed(3)} ${baseCurrency}/${timeInterval}`
	}


	// Display options
	export let conversionCurrency: 'Original' | 'ETH' | 'DAI' | 'USD' = 'Original'
	export let timeInterval = TimeInterval.Day


	import Table from './Table.svelte'
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
</script>

<div class="columns">
	<div class="boxed neumorphic">
		<span><strong>{totalSubscribers}</strong> unique subscriber{totalSubscribers === 1 ? '' : 's'}</span>
	</div>
	<div class="boxed neumorphic">
		<span><strong>{totalIncomingSubscriptions}</strong> unique subscription{totalIncomingSubscriptions === 1 ? '' : 's'}</span>
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
			'Subscriptions': tokenData.totalIncomingSubscriptions,
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

