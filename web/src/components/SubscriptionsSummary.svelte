<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	export let incomingSubscriptions
	export let outgoingSubscriptions

	// Display options
	let selected = 'Summary'
	let timeInterval: TimeInterval

	import IncomingSubscriptionsSummary from './IncomingSubscriptionsSummary.svelte'
	import OutgoingSubscriptionsSummary from './OutgoingSubscriptionsSummary.svelte'
	import Select from '../components/Select.svelte'
	import TokenValue from './TokenValue.svelte'

	import { scale } from 'svelte/transition'
</script>

<style>
	.stats {
		text-align: center;
	}
</style>

<div class="card">
	<div class="neumorphic columns">
		<Select options={['Summary', 'Incoming', 'Supporting']} bind:value={selected} style="full" />
	</div>
	<div class="stack">
		{#if selected === 'Summary'}
			<div class="column" transition:scale={{start: 0.8}}>
				<div class="columns stats">
					<div class="column">
						<span class="boxed neumorphic">≈ <TokenValue value={13,324.04} token="ETH" /></span>
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
				<div class="boxed neumorphic">
					<Select options={timeIntervals} bind:value={timeInterval} />
				</div>
			</div>
		{:else if selected === 'Incoming'}
			<div class="column" transition:scale={{start: 0.8}}>
				<IncomingSubscriptionsSummary {incomingSubscriptions} />
			</div>
		{:else if selected === 'Supporting'}
			<div class="column" transition:scale={{start: 0.8}}>
				<OutgoingSubscriptionsSummary {outgoingSubscriptions} />
			</div>
		{/if}
	</div>
</div>
