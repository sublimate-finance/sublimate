<script lang="ts">
	import { Currency } from '../types/currency'
	import { TimeInterval } from '../types/time-intervals'


	export let address
	export let profile

	export let suggested = {
		currency: Currency.DAI,
		rateAmount: 10,
		rateTimeInterval: TimeInterval.Month,
		durationAmount: 1,
		durationTimeInterval: TimeInterval.Month
	}

	let {currency, rateAmount, rateTimeInterval, durationAmount, durationTimeInterval} = suggested
	let totalAmount = 0 // rateAmount * duration

	enum Mode {
		Total,
		Rate
	}
	$: mode = 'rate'

	function onSubscribe(){
		currency, rateAmount, rateTimeInterval, durationAmount, durationTimeInterval
	}

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
			<input type="number" bind:value={rateAmount} min={1e-18} />
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
		<p>for</p>
		<div class="columns">
			<input type="number" bind:value={durationAmount} />
			<select bind:value={durationTimeInterval}>
				{#each Object.values(TimeInterval) as timeInterval}
					<option value={timeInterval}>{timeInterval}{durationAmount === 1 ? '' : 's'}</option>
				{/each}
			</select>
		</div>
	</label>
	<Button class="accented">Confirm Subscription</Button>
</form>
