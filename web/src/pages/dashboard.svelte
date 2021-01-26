<script lang="ts">
	import Button from '../components/Button.svelte'
	import CreatorSummary from '../components/CreatorSummary.svelte'

	const creator = {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200',
	}
</script>

<section class="flex flex-row px-16 py-8 space-x-8">
	<div class="flex flex-col w-1/2 space-y-8">
		<div class="flex flex-row space-x-6">
			<img class="w-16 h-16 block rounded-full" src={creator.image} alt="avatar" />
			<div class="flex flex-col justify-center space-y-2">
				<span class="font-bold text-gray-900 text-lg">{ creator.name }</span>
				<span class="text-purple-500">{ creator.summary }</span>
			</div>
		</div>
		<div class="flex flex-col space-y-4 max-w-sm">
			<button class="flex flex-row items-center justify-between p-8 px-12 space-x-2 bg-gradient-to-br from-purple-100 to-purple-300 border-0 text-gray-900 rounded-md">
				<span class="text-base"><b class="font-bold">sublimate.finance</b>/0x16A3...DfTA</span>
				<img src="/images/copy.svg" alt="copy" class="w-6 h-6 mb-1" />
			</button>
			<button class="flex flex-row items-center justify-between p-8 px-12 space-x-2 bg-gradient-to-br from-purple-100 to-purple-300 border-0 text-gray-900 rounded-md">
				<span class="text-base"><b class="font-bold">Embed button code</b></span>
				<img src="/images/copy.svg" alt="copy" class="w-6 h-6 mb-1" />
			</button>
		</div>
	</div>
	<div class="flex flex-col w-1/2">
		<div class="neumorphic">
			<img src="/images/chart.png" class="w-full h-auto" alt="chart" />
		</div>
	</div>
</section>

<section id="bottom">

</section>

