<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	export let user

	// Display options
	let selected = 'Summary'
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
	.stats {
		text-align: center;
	}

	.display-options {
		font-size: 0.85em;
	}
</style>

<div class="column">
	<div class="neumorphic columns">
		<Select options={['Summary', 'Incoming', 'Supporting']} bind:value={selected} style="full" />
	</div>
	<div class="stack card">
		{#if !user}
			<div class="row boxed neumorphic" transition:scale={{start: 0.8}}>
				<LoadingSpinner />
				Loading data from The Graph...
			</div>
		{:else if selected === 'Summary'}
			<div class="column" transition:scale={{start: 0.8}}>
				<div class="columns stats">
					<div class="column">
						<span class="boxed neumorphic">≈ <TokenValue value={13324.04} token="ETH" /></span>
						<span>collected since</span>
						<strong>January 2017</strong>.
					</div>
					<div class="column">
						<span class="boxed neumorphic">≈ <TokenValue value={24.04} token="ETH" /></span>
						<span>collected in the last</span>
						<strong>24 hours</strong>
					</div>
					<div class="column">
						<span class="boxed neumorphic">145 donators</span>
						<span>since</span>
						<strong>January 2017</strong>.
					</div>
				</div>
			</div>
		{:else if selected === 'Incoming'}
			<div class="column" transition:scale={{start: 0.8}}>
				<IncomingSubscriptionsSummary incomingSubscriptions={user.incomingSubscriptions} {conversionCurrency} {timeInterval} />
			</div>
		{:else if selected === 'Supporting'}
			<div class="column" transition:scale={{start: 0.8}}>
				<OutgoingSubscriptionsSummary outgoingSubscriptions={user.outgoingSubscriptions} />
			</div>
		{/if}
	</div>
	<div class="row display-options">
		<span>Show </span>
		<div class="columns">
			<div class="boxed neumorphic">
				<Select options={['Original', 'USD', 'ETH', 'DAI']} bind:value={conversionCurrency} />
			</div>
			<div class="boxed neumorphic">
				<Select options={timeIntervals} bind:value={timeInterval} />
			</div>
		</div>
	</div>
</div>
