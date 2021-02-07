<script lang="ts">
	import type { BigNumberish } from 'ethers'
	import { BigNumber } from 'ethers'
	import type { Ethereum } from '../types/ethereum'
	import type { TickerSymbol } from '../types/currency'
	import type { TimeInterval } from '../types/time-intervals'
	import { prices } from '../stores/prices'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string
	export let tokenName: string
	export let rateInterval: TimeInterval | undefined

	export let value: number | string | BigNumberish = '...'
	export let showDecimalPlaces = 2 + Math.round(Math.log10(prices[token]))

	export let isDebt = false

	export let showPlainFiat = true
	$: isFiat = showPlainFiat && ['USD', 'EUR', 'GBP', 'CAD', 'INR'].includes(token)


	const formatValue = value => {
		try {
			return globalThis.navigator
				? new Intl.NumberFormat(globalThis.navigator?.languages, {
					... isFiat ? {style: 'currency', currency: token} : {},
					minimumFractionDigits: showDecimalPlaces,
					maximumFractionDigits: showDecimalPlaces
				}).format(value)
				: value
		}catch(e){
			console.error(e)
			return value?.toString()
		}
	}

	import { tweened } from 'svelte/motion'
	const tweenedValue = tweened(Number(value), {
		duration: 300,
		easing: t => t,
		interpolate: (from, to) => t => Math.pow(Math.E, Math.log(from) + t * (Math.log(to) - Math.log(from)))
		// interpolate: (from, to) => t => console.log(from, to, t) ||
		// 	from instanceof BigNumber ? BigNumber.from(to).sub(from).mul(t).add(from) :
		// 	(Number(to) - Number(from)) * t + Number(from)
	})
	$: tweenedValue.set(Number(value))

	import TokenIcon from './TokenIcon.svelte'
</script>

<style>
	.token-value-container {
		display: inline-grid;
		grid-auto-flow: column;
		justify-content: start;
		align-items: baseline;
		--padding-inner: 0.33em;
		gap: var(--padding-inner);
	}

	.token-value-container > * {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.token-value {
		font-weight: 500;
	}

	.token-name, .rate-slash, .rate-interval {
		font-size: 0.8em;
	}

	.is-debt {
		color: var(--down-red);
	}
</style>

<span class="token-value-container" class:is-debt={isDebt} title="{value} {token} ({tokenName})">
	{#if isFiat}
		<span class="token-value">{formatValue($tweenedValue)}</span>
	{:else}
		<TokenIcon {token} {tokenAddress} {tokenIcon} />
		<span>
			<span class="token-value">{isDebt ? '−' : ''}{formatValue($tweenedValue)}</span>
			<span class="token-name">{token || '___'}</span>{#if rateInterval}<span class="rate-slash">/</span><span class="rate-interval">{rateInterval}</span>{/if}
		</span>
	{/if}
</span>
