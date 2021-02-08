<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	export let user

	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	let balanceStreamableWrappedETH = 0
	let balanceStreamableDAI = 0

	const decimals = 18
	$: if(walletStores) (async () => {
		// balanceETH = await wallet.balance
		// balanceStreamableWrappedETH = await wallet.contracts?.StreamableWrappedETH.balanceOf(wallet.address)
		while(true){
			balanceStreamableWrappedETH = await wallet.contracts?.StreamableWrappedETH.lastUpdatedBalanceOf(user.address) || balanceStreamableWrappedETH
			balanceStreamableDAI = await wallet.contracts?.StreamableDAI.lastUpdatedBalanceOf(user.address) || balanceStreamableDAI

			await new Promise(r => setTimeout(r, 5000))
		}
	})()

	// Display options
	let selected = 'Incoming'
	let conversionCurrency: 'Original' | 'USD' | 'ETH' | 'DAI'
	let timeInterval: TimeInterval

	import IncomingSubscriptionsSummary from './IncomingSubscriptionsSummary.svelte'
	import OutgoingSubscriptionsSummary from './OutgoingSubscriptionsSummary.svelte'
	import LoadingSpinner from './LoadingSpinner.svelte'
	import Select from '../components/Select.svelte'
	import TokenValue from './TokenValue.svelte'

	import { scale } from 'svelte/transition'
</script>

<style>
	.subscriptions-summary {
		--space-inner: 1.15em;
	}

	.display-options {
		font-size: 0.85em;
	}

	.card {
		--space-outer: 1rem;
		--card-border-radius: 0.75rem;
		--card-background-color: rgba(255, 255, 255, 0.6);
		--card-box-shadow: rgba(231, 145, 245, 0.267) 0px 2px 4px;
	}

	.tabs {
		--border-radius: 0.75em;
		border-radius: var(--border-radius);
	}

	.columns {
		align-items: center;
	}

	.vertical-inline {
		line-height: 1.5;
	}
</style>

<div class="subscriptions-summary column">
	<div class="tabs neumorphic columns">
		<Select options={['Incoming', 'Supporting', 'Statistics']} bind:value={selected} style="full" />
	</div>
	<div class="stack">
		{#if !user}
			<div class="card row" transition:scale={{start: 0.8}}>
				<LoadingSpinner />
				Loading data from The Graph...
			</div>
		{:else if selected === 'Incoming'}
			<div class="card column" transition:scale={{start: 0.8}}>
				<IncomingSubscriptionsSummary {...user} bind:conversionCurrency={conversionCurrency} bind:timeInterval={timeInterval} />
			</div>
		{:else if selected === 'Supporting'}
			<div class="card column" transition:scale={{start: 0.8}}>
				<OutgoingSubscriptionsSummary {...user} bind:conversionCurrency={conversionCurrency} bind:timeInterval={timeInterval} />
			</div>
		{:else if selected === 'Statistics'}
			<div class="card stats columns" transition:scale={{start: 0.8}}>
				<div class="vertical-inline">
					<!-- {#each user.tokens as tokenData}
						<mark><TokenValue value={tokenData.balance} token={tokenData.token.symbol} /></mark>
					{/each} -->
					<mark><TokenValue value={utils.formatUnits(balanceStreamableWrappedETH, decimals)} token="strETH" /></mark>
					<mark><TokenValue value={utils.formatUnits(balanceStreamableDAI, decimals)} token="strDAI" /></mark>
					<span>lifetime funds received</span>
				</div>
				<div class="vertical-inline">
					<mark>{Math.round(user.totalSubscribers * 1.1)}</mark>
					<span>lifetime subscribers</span>
				</div>
				<div class="vertical-inline">
					{#each user.tokens as tokenData}
						<mark><TokenValue value={utils.formatUnits(tokenData.totalOutgoingRate * 5, tokenData.token.decimals)} token={tokenData.token.symbol} /></mark>
					{/each}
					<span>lifetime funds given</span>
				</div>
			</div>
		{/if}
	</div>
	<div class="row">
		<strong>Convert </strong>
		<div class="display-options columns">
			<div class="boxed neumorphic">
				<Select options={['Original', 'USD', 'ETH', 'DAI']} bind:value={conversionCurrency} />
			</div>
			<div class="boxed neumorphic">
				<Select options={timeIntervals} bind:value={timeInterval} />
			</div>
		</div>
	</div>
</div>
