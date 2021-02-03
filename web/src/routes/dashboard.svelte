<script lang="ts">
	import { TimeInterval, timeIntervals } from '../types/time-intervals'

	import { creators } from '../stores/creators'

	const creator = creators[0]

	import AllTransactions from '../components/AllTransactions.svelte'
	import Button from '../components/Button.svelte'
	import CreatorChart from '../components/CreatorChart.svelte'
	import Footer from '../components/Footer.svelte'
	import ProfileSummary from '../components/ProfileSummary.svelte'
	import SubscriptionsSummary from '../components/SubscriptionsSummary.svelte'
</script>

<style>
	.dashboard {
		display: grid;
		grid-template-columns: 30rem 1fr;
	}

	.card {
		--space-inner: 2.5em;
	}

	.column {
		--space-inner: 1.5em;
		align-content: start;
	}
	.card .row {
		--space-inner: 1em;
	}
	.card .column {
		--space-inner: 0.5em;
	}

	.cover-image {
		width: 100%;
		height: 8rem;
	}

	.creator-link {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<section class="dashboard">
	<div class="column">
		<div class="card">
			<div class="row">
				<img src={creator.profile.avatar} alt="Avatar" class="block rounded-full" width="80" height="80" />
				<div class="column">
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
				<div class="column">
					<h3>About</h3>
					<textarea class="boxed neumorphic" bind:value={creator.profile.about} rows="3" />
				</div>
			</div>
			<div class="column">
				<div class="bar">
					<h3>Links</h3>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
				<label class="column">
					<span>Website</span>
					<input type="text" class="neumorphic" bind:value={creator.profile.website} placeholder="https://sublimate.finance" />
				</label>
				<label class="column">
					<span>Twitter</span>
					<input type="text" class="neumorphic" bind:value={creator.profile.twitter} placeholder="https://twitter.com/SublimateFinance" />
				</label>
			</div>
			<div class="column">
				<div class="bar">
					<h3>Cover image</h3>
					<img src="/images/edit.svg" alt="edit" class="w-4 h-4" />
				</div>
				<img class="cover-image rounded-md shadow-inner" src={creator.profile.cover} alt="Cover Image" height="100" />
			</div>
		</div>
		<div class="card">
			<div class="column">
				<h3>Share your Sublimate link</h3>
				<div class="bar boxed neumorphic">
					<a href="/creator/{creator.address}" class="creator-link">sublimate.finance/creator/{creator.address}</a>
					<Button>Copy</Button>
					<!-- <img src="/images/copy.svg" alt="copy" /> -->
				</div>
			</div>
			<div class="column">
				<h3>Embed Sublimate within your website</h3>
				<div class="columns">
					<Button>Copy Embed Code</Button>
				</div>
			</div>
		</div>
	</div>
	<div class="column flex-1 p-8">
		<CreatorChart />

		<!-- <ProfileSummary {profile} /> -->
		<SubscriptionsSummary incomingSubscriptions={creator.incomingSubscriptions} outgoingSubscriptions={creator.outgoingSubscriptions} />
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions transactions={creator.transactions} />
	</section>

	<Footer />
</div>
