<script lang="ts">
	import AllTransactions from '../components/AllTransactions.svelte'
	import ProfileSummary from '../components/ProfileSummary.svelte'
	import Footer from '../components/Footer.svelte'

	const creator = {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200',
		cover: 'https://picsum.photos/1920/1080'
	}
</script>

<section class="flex flex-row">
	<div class="flex flex-col w-full space-y-16 max-w-md bg-white p-8 px-16">
		<div class="flex flex-row w-full space-x-6">
			<img class="w-16 h-16 block rounded-full" src={creator.image} alt="avatar" />
			<div class="flex-1 flex flex-col justify-center space-y-2">
				<div class="flex flex-row items-center w-full justify-between">
					<span class="font-bold text-gray-900 text-lg">{ creator.name }</span>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
				<div class="flex flex-row items-center w-full justify-between">
					<span class="text-primary-200">{ creator.summary }</span>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
			</div>
		</div>
		<div class="flex flex-col space-y-8 w-full">
			<div class="flex flex-col space-y-2 w-full">
				<span class="text-gray-900 font-bold">Overall information</span>
				<div class="flex flex-row items-center space-x-2 text-sm">
					<span class="p-3 rounded-md shadow-inner"><b class="font-bold">13,324.04</b> ETH</span>
					<span>collected since January 2017.</span>
				</div>
				<div class="flex flex-row items-center space-x-2 text-sm">
					<span class="p-3 rounded-md shadow-inner"><b class="font-bold">24.04</b> ETH</span>
					<span>collected in the last</span>
					<span class="p-3 rounded-md shadow-inner"><b class="font-bold">24 hours.</b></span>
				</div>
				<div class="flex flex-row items-center px-6 py-1 bg-primary-100 bg-opacity-5 shadow-inner rounded-md space-x-4 text-gray-600">
					<button class="w-16">block</button>
					<button class="w-16 text-gray-900 px-3 p-1 bg-white rounded-full shadow-inner font-bold">day</button>
					<button class="w-16">month</button>
					<button class="w-16">year</button>
				</div>
			</div>
			<div class="flex flex-col space-y-2 w-full">
				<span class="text-gray-900 font-bold">Share your Sublimate link</span>
				<button class="flex flex-row items-center justify-between px-4 py-3 space-x-2 bg-primary-100 bg-opacity-10 text-gray-900 rounded-md">
					<span>Embed button code</span>
					<img src="/images/copy.svg" alt="copy" class="w-4 h-4 mb-1" />
				</button>
				<button class="flex flex-row items-center justify-between px-4 py-3 space-x-2 bg-primary-100 bg-opacity-10 text-gray-900 rounded-md">
					<span>sublimate.finance/0x16A3...DfTA</span>
					<img src="/images/copy.svg" alt="copy" class="w-4 h-4 mb-1" />
				</button>
			</div>
			<div class="flex flex-col space-y-2 w-full">
				<div class="flex flex-row items-center space-x-2">
					<span class="text-gray-900 font-bold">Change your cover</span>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
				<div class="w-full h-20 shadow-inner rounded-md" style={`background-image: url(${creator.cover}); background-position: center; background-size: cover;`} />
			</div>
		</div>
	</div>
	<div class="flex-1 flex flex-col space-y-8 p-8 items-center">
		<img src="/images/chart.png" class="w-full h-auto" alt="chart" />
		<ProfileSummary user={creator} />
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions user={creator} />
	</section>
	
	<Footer />
</div>
