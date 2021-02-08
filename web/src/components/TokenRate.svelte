<script lang="ts">
	import { averageBlocksPerTimeInterval, TimeInterval } from '../types/time-intervals'
	import { BigNumber, utils } from 'ethers'
	import { prices } from '../stores/prices'

	function nonStreamableToken(token){
		return token.replace(/^str/, '')
	}

	export let token: string
	export let tokenAddress
	export let decimals: number
	export let tokensPerBlock: BigNumber

	// Display options
	export let conversionCurrency: 'Original' | 'ETH' | 'DAI' | 'USD'
	export let timeInterval: TimeInterval

	$: _token = nonStreamableToken(token)

	$: convertToBaseCurrency = conversionCurrency !== 'Original' && nonStreamableToken(token) != conversionCurrency

	$: value = utils.formatUnits(
		(convertToBaseCurrency
			? tokensPerBlock.mul(prices[_token]).div(prices[conversionCurrency])
			: tokensPerBlock
		)
			.mul(averageBlocksPerTimeInterval[timeInterval])
			.toString(),
		decimals
	)
	$: isApproximate = timeInterval !== TimeInterval.Block || convertToBaseCurrency

	import TokenValue from './TokenValue.svelte'
</script>

<span class="nowrap">
	{isApproximate ? '≈ ' : ''}{#key conversionCurrency}
		<TokenValue
			{value}
			token={convertToBaseCurrency ? conversionCurrency : _token}
			{tokenAddress}
			rateInterval={timeInterval}
			/>
	{/key}
</span>
