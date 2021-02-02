<script lang="ts">
	import { Currency } from '../types/currency'
	import { averageBlocksPerTimeInterval, TimeInterval } from '../types/time-intervals'
	import type { StrETH } from '../../../contracts/typechain/StrETH'

	export let address
	export let profile

	export let suggested = {
		currency: Currency.DAI,
		totalAmount: 10,
		rateAmount: 10,
		rateTimeInterval: TimeInterval.Month,
		durationAmount: 1,
		durationTimeInterval: TimeInterval.Month
	}


	// Dynamic user inputs from form fields (default to suggested values)
	let {currency, totalAmount, rateAmount, rateTimeInterval, durationAmount, durationTimeInterval} = suggested

	enum InputMode {
		RateAndDuration, // User inputs rate and duration, e.g. 1 DAI/day for 3 months
		TotalAndDuration, // User inputs total and duration, e.g. 90 DAI for 3 months
	}
	$: inputMode = (rateTimeInterval as 'total' | TimeInterval) === 'total' ? InputMode.TotalAndDuration : InputMode.RateAndDuration


	// Calculate tokensPerBlock (rate) and totalTokens (maxTokens) based on user input
	const decimals = 1e-18
	$: _totalAmount = totalAmount * decimals
	$: _rateAmount = rateAmount * decimals
	$: _durationAmount = durationAmount * decimals

	$: durationInBlocks = _durationAmount * averageBlocksPerTimeInterval[durationTimeInterval]
	$: tokensPerBlock =
		inputMode === InputMode.RateAndDuration ? _rateAmount / averageBlocksPerTimeInterval[rateTimeInterval] :
		inputMode === InputMode.TotalAndDuration ? _totalAmount / durationInBlocks :
		0
	$: totalTokens =
		inputMode === InputMode.RateAndDuration ? tokensPerBlock * durationInBlocks :
		inputMode === InputMode.TotalAndDuration ? _totalAmount :
		0


	// Contract calls
	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	async function onSubscribe(){
		await flow.execute(contracts => {
			const contract = contracts.strETH as StrETH
			// from, to, rate, maxAmount
			contract.updateSubscription(wallet.address, address, tokensPerBlock, totalTokens)
		})
	}
	// const contract = {
	// 	'DAI': '0x6b175474e89094c44da98b954eedeac495271d0f',
	// 	'ETH': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
	// }

	import Button from '../components/Button.svelte'
</script>

<style>
	.column > * {
		--space-inner: 0.25em;
	}
</style>

<form class="column card neumorphic" on:submit|preventDefault={onSubscribe}>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="column">
		<span>Stream</span>
		<div class="rate-or-total-amount bar">
			{#if inputMode === InputMode.TotalAndDuration}
				<input type="number" bind:value={totalAmount} min={1e-18} />
			{:else if inputMode === InputMode.RateAndDuration}
				<input type="number" bind:value={rateAmount} min={1e-18} />
			{/if}
			<select bind:value={currency}>
				{#each Object.values(Currency) as currency}
					<option>{currency}</option>
				{/each}
			</select>
			<select bind:value={rateTimeInterval}>
				<option value="total">total</option>
				{#each Object.values(TimeInterval) as timeInterval}
					<option value={timeInterval}>/{timeInterval}</option>
				{/each}
			</select>
			<!-- <select>
				{#each Object.values(Currency) as currency}
					<option>{currency} (total)</option>
					{#each Object.values(TimeInterval) as timeInterval}
						<option>{currency}/{timeInterval}</option>
					{/each}
				{/each}
			</select> -->
		</div>
	</label>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="column duration">
		<p>over {durationTimeInterval === TimeInterval.Block ? 'exactly' : 'approximately'}</p>
		<div class="columns">
			<input type="number" bind:value={durationAmount} min={1} />
			<select bind:value={durationTimeInterval}>
				{#each Object.values(TimeInterval) as timeInterval}
					<option value={timeInterval}>{timeInterval}{durationAmount === 1 ? '' : 's'}</option>
				{/each}
			</select>
		</div>
	</label>

	<Button class="accented">Confirm Subscription</Button>
</form>
