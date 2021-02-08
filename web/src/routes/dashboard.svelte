<script lang="ts">
	import { onMount } from 'svelte'

	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	let getUser, getSubscription
	onMount(async () => ({getUser, getSubscription} = await import('../stores/subgraph')))

	// TODO: Get from subgraph and AWS backend
	import { creators } from '../stores/creators'
	const createNewUser = address => ({
		id: address,
		address: address,
		profile: {
			name: '',
			ens: '',
			summary: '',
			about: '',
			avatar: 'https://picsum.photos/200/200',
			cover: 'https://picsum.photos/1920/1080',
			website: '',
			twitter: ''
		},

		tokens: [{
			token: {
				symbol: 'strETH',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}, {
			token: {
				id: '0x6b175474e89094c44da98b954eedeac495271d0f',
				symbol: 'strDAI',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}, {
			token: {
				id: '0x12e51e77daaa58aa0e9247db7510ea4b46f9bead',
				symbol: 'straYFI',
				decimals: 18
			},

			totalIncomingRate: 0,
			totalMaxIncomingAmount: 0,
			totalIncomingSubscriptions: 0,
			totalSubscribers: 0,

			totalOutgoingRate: 0, //
			totalMaxOutgoingAmount: 0, //
			totalOutgoingSubscriptions: 1, //
			totalSubscribedTo: 1 //
		}],

		totalIncomingSubscriptions: 0,
		totalSubscribers: 0,
		totalOutgoingSubscriptions: 2,
		totalSubscribedTo: 2
	})

	let address
	$: if(wallet && $wallet.address)
		address = $wallet.address

	let userStore
	$: if(getUser && address){
		userStore = getUser(address)
		console.log('user', userStore, $userStore)
	}

	let user
	$: if(userStore && $userStore){
		// user = $userStore
	}else{
		// Default: fetch from dummy data
		user = creators.find(c => c.address.toLowerCase() == address?.toLowerCase())
		if(!user && address){
			// Create new user
			user = createNewUser(address)
			creators.push(user)
		}
	}

	let profile = {}
	$: if(user?.profile)
		profile = user.profile


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
			{#if profile}
				<div class="column">
					<ProfileEditor {profile} />
					<div class="card">
						<div class="column">
							<h3>Share your Sublimate profile</h3>
							<div class="bar boxed neumorphic">
								<a href="/creator/{profile.ens || profile.address}" class="creator-link" bind:this={creatorLink}>sublimate.finance/creator/{profile.ens || profile.address}</a>
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
			{/if}
			{#if user}
				<div class="column flex-1 p-8">
					<CreatorChart {user} />
					<SubscriptionsSummary {user} />
				</div>
			{/if}
		</section>

		<!-- <div class="bg-white">
			<section class="w-full px-8 py-16 mb-32">
				<AllTransactions transactions={user.transactions} />
			</section>

			<Footer />
		</div> -->
	</div>
</div>
