<script lang="ts">
	import { BigNumber, utils } from 'ethers'
	import type { StrETH } from '../../../contracts/typechain/StrETH'
	import { Currency } from '../types/currency'
	import { averageBlocksPerTimeInterval, TimeInterval } from '../types/time-intervals'

	export let address
	export let profile

	export let suggested = {
		currency: Currency.ETH,
		totalAmount: '0.001',
		rateAmount: '0.001',
		rateTimeInterval: TimeInterval.Month,
		durationAmount: '1',
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
	const decimals = 18
	$: _totalAmount = utils.parseUnits(totalAmount.toString(), decimals)
	$: _rateAmount = utils.parseUnits(rateAmount.toString(), decimals)
	$: _durationAmount = BigNumber.from(durationAmount.toString())

	$: blocks = _durationAmount.mul(averageBlocksPerTimeInterval[durationTimeInterval])
	$: tokensPerBlock =
		inputMode === InputMode.RateAndDuration ? _rateAmount.div(averageBlocksPerTimeInterval[rateTimeInterval]) :
		inputMode === InputMode.TotalAndDuration ? _totalAmount.div(blocks) :
		BigNumber.from(0)
	$: totalTokens =
		inputMode === InputMode.RateAndDuration ? blocks.mul(_rateAmount).div(averageBlocksPerTimeInterval[rateTimeInterval]) :
		inputMode === InputMode.TotalAndDuration ? _totalAmount :
		BigNumber.from(0)

	let topUpAmount
	$: wrappedCurrency = `str${currency}`


	enum FlowAction {
		TopUpDeposit,
		StartSubscription
	}
	let flowAction


	// Contract calls
	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	async function depositAndUpdateSubscription(from: string, to: string, rate: BigNumber, maxAmount: BigNumber){
		console.log({from, to, rate: rate.toString(), maxAmount: maxAmount.toString()})

		await flow.execute(async contracts => {
			const WrappedStreamableToken =
				currency === Currency.ETH ? contracts.strETH as StrETH :
				// currency === Currency.DAI ? contracts.strDAI as StrDAI :
				undefined

			const currentBalance = await WrappedStreamableToken.balanceOf(from)

			// Top up balance of strToken by wrapping ERC20 token
			console.log(maxAmount.toString(), currentBalance.toString())
			topUpAmount = maxAmount.sub(currentBalance)
			if(topUpAmount.gt(0)){
				flowAction = FlowAction.TopUpDeposit
				await WrappedStreamableToken.deposit({
					value: topUpAmount
				})
			}

			// Update subscription
			flowAction = FlowAction.StartSubscription
			return await WrappedStreamableToken.updateSubscription(from, to, rate, maxAmount)
		})
	}
	// const contract = {
	// 	'DAI': '0x6b175474e89094c44da98b954eedeac495271d0f',
	// 	'ETH': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
	// }

	import Address from '../components/Address.svelte'
	import Button from '../components/Button.svelte'
	import TokenName from '../components/TokenName.svelte'
	import TokenValue from '../components/TokenValue.svelte'
	import WalletAccess from '../components/WalletAccess.svelte'
</script>

<style>
	.column > * {
		--space-inner: 0.25em;
	}
</style>

<form class="column card neumorphic" on:submit|preventDefault={() => depositAndUpdateSubscription(wallet.address, address, tokensPerBlock, totalTokens)}>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="column">
		<span>Stream</span>
		<div class="rate-or-total-amount bar">
			{#if inputMode === InputMode.TotalAndDuration}
				<input type="number" bind:value={totalAmount} min={1e-5} step={1e-5} />
			{:else if inputMode === InputMode.RateAndDuration}
				<input type="number" bind:value={rateAmount} min={1e-5} step={1e-5} />
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
					<option value={timeInterval}>{timeInterval}{durationAmount == 1 ? '' : 's'}</option>
				{/each}
			</select>
		</div>
	</label>

	<Button class="accented" type="submit" disabled={walletStores === undefined}>Confirm Subscription</Button>
</form>

<WalletAccess>
	{#if flowAction === FlowAction.TopUpDeposit}
		<h2>Top-up Deposit</h2>
		<p>
			You're wrapping
			<TokenValue value={utils.formatUnits(topUpAmount, decimals)} token={currency} />
			into <TokenName token={wrappedCurrency} />
			in order to have the needed <TokenValue value={utils.formatUnits(totalTokens, decimals)} token={wrappedCurrency} />
			for this subscription.
		</p>
	{:else if flowAction === FlowAction.StartSubscription}
		<h2>Start Subscription</h2>
		<p>
			You're authorizing
			<TokenValue value={utils.formatUnits(totalTokens, decimals)} token={wrappedCurrency} />
			to be streamed to {profile.name ? `${profile.name}'s address ` : ''}<Address {address} />
			at a rate of <TokenValue value={utils.formatUnits(tokensPerBlock, decimals)} token={wrappedCurrency} rateInterval={TimeInterval.Block} />
			over a period of {blocks} blocks.
		</p>
		<p>
			At the blockchain's current speed of <strong>13 seconds/block</strong>,
			this subscription will end in approximately {durationAmount} {durationTimeInterval}.
		</p>
		<p>You can stop streaming funds at any time by canceling your subscription.</p>
	{/if}
</WalletAccess>
