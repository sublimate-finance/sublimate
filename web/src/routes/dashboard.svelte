<script lang="ts">
	import { onMount } from 'svelte'

	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	let getUser, getSubscription
	onMount(async () => ({getUser, getSubscription} = await import('../stores/subgraph')))

	let user
	$: if(getUser && wallet && $wallet.address){
		user = getUser($wallet.address)
		console.log('user', user, $user)
	}

	// TODO: Get from subgraph and AWS backend
	import { creators } from '../stores/creators'
	const creator = creators[0]


	let creatorLink

	import AllTransactions from '../components/AllTransactions.svelte'
	import CopyButton from '../components/CopyButton.svelte'
	import CreatorChart from '../components/CreatorChart.svelte'
	import Footer from '../components/Footer.svelte'
	import ProfileEditor from '../components/ProfileEditor.svelte'
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
	.card .column {
		--space-inner: 0.5em;
	}

	.creator-link {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<section class="dashboard">
	<div class="column">
		<ProfileEditor profile={creator.profile} />
		<div class="card">
			<div class="column">
				<h3>Share your Sublimate profile</h3>
				<div class="bar boxed neumorphic">
					<a href="/creator/{creator.address}" class="creator-link" bind:this={creatorLink}>sublimate.finance/creator/{creator.address}</a>
					<CopyButton content={creatorLink?.href} />
					<!-- <img src="/images/copy.svg" alt="copy" /> -->
				</div>
			</div>
			<div class="column">
				<h3>Embed Sublimate on your website</h3>
				<div class="columns">
					<CopyButton>Copy Embed Code</CopyButton>
				</div>
			</div>
		</div>
	</div>
	<div class="column flex-1 p-8">
		<CreatorChart />
		<SubscriptionsSummary incomingSubscriptions={creator.incomingSubscriptions} outgoingSubscriptions={creator.outgoingSubscriptions} />
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions transactions={creator.transactions} />
	</section>

	<Footer />
</div>
