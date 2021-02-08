<script lang="ts">
	let chartTimeInterval = '1d'

	import Select from '../components/Select.svelte'
</script>

<style>
	.balance {
		font-size: 2.5em;
	}
	.chart {
		overflow: hidden;
		height: 20rem;
	}
</style>

<div class="creator-chart column">
	<div class="bar">
		<h2 class="balance">$20,010.34</h2>
		<div>
			<Select options={['1h', '1d', '1m', '1w', '1y']} bind:value={chartTimeInterval} />
		</div>
	</div>
	<div class="chart boxed neumorphic">

	</div>
</div>
