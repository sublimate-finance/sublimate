<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	export let user

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
				<IncomingSubscriptionsSummary incomingSubscriptions={user.incomingSubscriptions} bind:conversionCurrency={conversionCurrency} bind:timeInterval={timeInterval} />
			</div>
		{:else if selected === 'Supporting'}
			<div class="card column" transition:scale={{start: 0.8}}>
				<OutgoingSubscriptionsSummary outgoingSubscriptions={user.outgoingSubscriptions} />
			</div>
		{:else if selected === 'Statistics'}
			<div class="card stats columns" transition:scale={{start: 0.8}}>
				<div class="vertical-inline">
					<span class="boxed neumorphic">≈ <TokenValue value={0.1} token="ETH" /></span>
					<span>collected since <strong>January 2017</strong>.</span>
				</div>
				<div class="vertical-inline">
					<span class="boxed neumorphic">≈ <TokenValue value={24.04} token="ETH" /></span>
					<span>collected in the last <strong>24 hours</strong>.</span>
				</div>
				<div class="vertical-inline">
					<span class="boxed neumorphic">145 donators</span>
					<span>since <strong>January 2017</strong>.</span>
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
