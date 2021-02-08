<script lang="ts">
	import { onMount } from 'svelte'

	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	let getUser, getSubscription
	onMount(async () => ({getUser, getSubscription} = await import('../stores/subgraph')))

	// TODO: Get from subgraph and AWS backend
	import { creators } from '../stores/creators'
	const placeholderUser = creators[creators.length - 1]

	let user = placeholderUser
	let userStore
	$: if(getUser && wallet && $wallet.address){
		userStore = getUser($wallet.address)
		// user.id = user.address = $wallet.address
		console.log('user', userStore, $userStore)
	}
	$: if(userStore)
		user = $userStore


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

<div class="stack">
	<div>
		<section class="dashboard">
			<div class="column">
				<ProfileEditor profile={user.profile} />
				<div class="card">
					<div class="column">
						<h3>Share your Sublimate profile</h3>
						<div class="bar boxed neumorphic">
							<a href="/creator/{user.address}" class="creator-link" bind:this={creatorLink}>sublimate.finance/creator/{user.address}</a>
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
				<CreatorChart {user} />
				<SubscriptionsSummary {user} />
			</div>
		</section>

		<!-- <div class="bg-white">
			<section class="w-full px-8 py-16 mb-32">
				<AllTransactions transactions={user.transactions} />
			</section>

			<Footer />
		</div> -->
	</div>
</div>
