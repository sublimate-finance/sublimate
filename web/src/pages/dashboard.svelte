<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	import { creators } from '../stores/creators'

	const creator = creators[0]

	let rateTimeInterval = TimeInterval.Day

	import AllTransactions from '../components/AllTransactions.svelte'
	import CreatorChart from '../components/CreatorChart.svelte'
	import Footer from '../components/Footer.svelte'
	import IncomingSubscriptionsSummary from '../components/IncomingSubscriptionsSummary.svelte'
	import ProfileSummary from '../components/ProfileSummary.svelte'
	import Select from '../components/Select.svelte'
</script>

<style>
	.card {
		--space-inner: 2.5em;
	}

	.card .row {
		--space-inner: 1em;
	}
	.card .column {
		--space-inner: 0.5em;
	}
</style>

<section class="flex flex-row">
	<div class="card">
		<div class="row">
			<img src={creator.profile.avatar} alt="Avatar" class="block rounded-full" width="80" height="80" />
			<div class="flex-1 flex flex-col justify-center space-y-2">
				<div class="bar">
					<h2>{creator.profile.name}</h2>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
				<div class="bar">
					<span class="text-primary-200">{creator.profile.summary}</span>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
			</div>
		</div>
		<div class="column">
			<h3>Quick Stats</h3>
			<!-- <p>
				<span class="boxed neumorphic">13,324.04 ETH</span>
				<span>collected since January 2017.</span>
			</p>
			<p>
				<span class="boxed neumorphic">24.04 ETH</span>
				<span>collected in the last</span>
				<span class="boxed neumorphic">24 hours</span>.
			</p> -->
			<div class="flex flex-row items-center space-x-2 text-sm">
				<span class="p-3 rounded-md shadow-inner"><b class="font-bold">13,324.04</b> ETH</span>
				<span>collected since January 2017.</span>
			</div>
			<div class="flex flex-row items-center space-x-2 text-sm">
				<span class="p-3 rounded-md shadow-inner"><b class="font-bold">24.04</b> ETH</span>
				<span>collected in the last</span>
				<span class="p-3 rounded-md shadow-inner"><b class="font-bold">24 hours.</b></span>
			</div>

			<div class="boxed neumorphic">
				<Select options={timeIntervals} bind:value={rateTimeInterval} />
			</div>
		</div>
		<div class="column">
			<h3>Share your Sublimate link</h3>
			<button class="bar boxed neumorphic">
				<span>Embed button code</span>
				<img src="/images/copy.svg" alt="copy" class="w-4 h-4 mb-1" />
			</button>
			<button class="bar boxed neumorphic">
				<span>sublimate.finance/0x16A3...DfTA</span>
				<img src="/images/copy.svg" alt="copy" class="w-4 h-4 mb-1" />
			</button>
		</div>
		<div class="column">
			<div class="bar">
				<h3>Cover image</h3>
				<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
			</div>
			<div class="w-full h-20 shadow-inner rounded-md" style={`background-image: url(${creator.profile.cover}); background-position: center; background-size: cover;`} />
		</div>
	</div>
	<div class="column flex-1 p-8">
		<CreatorChart />

		<!-- <ProfileSummary {profile} /> -->
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions transactions={creator.transactions} />
	</section>

	<Footer />
</div>
