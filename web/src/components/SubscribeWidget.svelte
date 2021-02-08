<script lang="ts">
	import { BigNumber, utils } from 'ethers'
	import type { StreamableWrappedETH, StreamableDAI } from '../../../contracts/typechain/StreamableWrappedETH'
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
	$: _totalAmount = utils.parseUnits((totalAmount || 0).toString(), decimals)
	$: _rateAmount = utils.parseUnits((rateAmount || 0).toString(), decimals)
	$: _durationAmount = BigNumber.from((durationAmount || 0).toString())

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
		ApproveERC20,
		TopUpDeposit,
		StartSubscription
	}
	let flowAction

	let estimatedGas


	// Contract calls
	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	async function depositAndUpdateSubscription(from: string, to: string, rate: BigNumber, maxAmount: BigNumber){
		console.log({from, to, rate: rate.toString(), maxAmount: maxAmount.toString()})

		flowAction = undefined
		await flow.execute(async contracts => {
			const StreamableToken =
				currency === Currency.ETH ? contracts.StreamableWrappedETH as StreamableWrappedETH :
				currency === Currency.DAI ? contracts.StreamableDAI as StreamableDAI :
				undefined

			const currentBalance = await StreamableToken.balanceOf(from)

			// Top up balance of strToken by wrapping ERC-20 token
			topUpAmount = maxAmount.sub(currentBalance)
			if(topUpAmount.gt(0)){
				// ERC-20 allowance
				if(currency !== Currency.ETH){
					// Check current allowance
					const allowance = await StreamableToken.allowance(from, StreamableToken.address)
					console.log('allowance', allowance)

					// Approve ERC-20 token
					if(allowance.lt(topUpAmount)){
						estimatedGas = await StreamableToken.estimateGas.approve(from, topUpAmount)
						flowAction = FlowAction.ApproveERC20
						await StreamableToken.approve(from, topUpAmount)
					}
				}

				estimatedGas = await StreamableToken.estimateGas.deposit({value: topUpAmount})
				flowAction = FlowAction.TopUpDeposit
				await StreamableToken.deposit({value: topUpAmount})
			}

			// Update subscription
			estimatedGas = await StreamableToken.estimateGas.updateSubscription(from, to, rate, maxAmount)
			flowAction = FlowAction.StartSubscription
			return await StreamableToken.updateSubscription(from, to, rate, maxAmount)
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

	strong {
		font-weight: 500;
	}
</style>

<form class="column card neumorphic" on:submit|preventDefault={() => depositAndUpdateSubscription(wallet.address, address, tokensPerBlock, totalTokens)}>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="column">
		<strong>Stream</strong>
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
		<strong>over {durationTimeInterval === TimeInterval.Block ? 'exactly' : 'approximately'}</strong>
		<div class="bar">
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

<WalletAccess bind:estimatedGas={estimatedGas}>
	{#if flowAction === FlowAction.ApproveERC20}
		<h2>Approve <TokenName token={currency} /></h2>
		<p class="vertical-inline">
			<span>
				You need to convert
				<mark><TokenValue value={utils.formatUnits(topUpAmount, decimals)} token={currency} showDecimalPlaces={6} /></mark>
				into <TokenName token={wrappedCurrency} />
			</span>
			<span>
				in order to have the <mark><TokenValue value={utils.formatUnits(totalTokens, decimals)} token={wrappedCurrency} showDecimalPlaces={6} /></mark> needed for this subscription.
			</span>
		</p>
	{:else if flowAction === FlowAction.TopUpDeposit}
		<h2>Top up your <TokenName token={wrappedCurrency} /> balance</h2>
		<p class="vertical-inline">
			<span>
				You'll convert
				<mark><TokenValue value={utils.formatUnits(topUpAmount, decimals)} token={currency} showDecimalPlaces={6} /></mark>
				into <TokenName token={wrappedCurrency} />
			</span>
			<span>
				in order to have the <mark><TokenValue value={utils.formatUnits(totalTokens, decimals)} token={wrappedCurrency} showDecimalPlaces={6} /></mark> needed for this subscription.
			</span>
		</p>
	{:else if flowAction === FlowAction.StartSubscription}
		<h2>Start Subscription</h2>
		<p class="vertical-inline">
			<span>
				You'll stream
				<mark><TokenValue value={utils.formatUnits(totalTokens, decimals)} token={wrappedCurrency} /></mark>
			</span>
			<span>
				to {profile.name && profile.name !== address ? `${profile.name}'s address, ` : 'address'}
				<mark><Address {address} /></mark>
			</span>
			<span>
				at a rate of
				<mark>≈ <TokenValue value={rateAmount} token={wrappedCurrency} rateInterval={rateTimeInterval} /></mark>
				{#if inputMode === InputMode.RateAndDuration}
					<small class="nowrap">(<mark><TokenValue value={utils.formatUnits(tokensPerBlock, decimals)} token={wrappedCurrency} rateInterval={TimeInterval.Block} showDecimalPlaces={10} /></mark>)</small>
				{/if}
			</span>
			<span>
				until
				<mark>≈ {durationAmount} {durationTimeInterval}{durationAmount == 1 ? '' : 's'}</mark>
				<small class="nowrap">(<mark>{blocks} blocks</mark>)</small>
				from now.
			</span>
		</p>
		<!-- <p>
			<span>At the blockchain's current speed of <strong>13 seconds/block</strong>,</span>
			<span>this subscription will end in approximately {durationAmount} {durationTimeInterval}.</span>
		</p> -->
		<hr>
		<p>You can stop streaming funds at any time by canceling your subscription.</p>
	{/if}
</WalletAccess>
