<script context="module">
	export async function preload({ params: {addressOrENS} }) {
		return { addressOrENS }
	}
</script>

<script lang="ts">
	import { utils } from 'ethers'
	import { creators } from '../../stores/creators'

	import { onMount } from 'svelte'

	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../../stores/wallet')).getWalletStores())

	let getUser, getSubscription
	onMount(async () => ({getUser, getSubscription} = await import('../../stores/subgraph')))



	export let addressOrENS

	let address
	$: if(addressOrENS){
		globalThis.window && (window['utils'] = utils)
		console.log(utils.isAddress(addressOrENS))
		if(utils.isAddress(addressOrENS)){
			address = addressOrENS
		}else{
			const ensName = addressOrENS

			// Default: fetch from dummy data
			const user = creators.find(c => c.profile.ens.toLowerCase() == ensName.toLowerCase())
			if(user?.address)
				address = user.address

			// Resolve ENS name
			wallet?.provider?.resolveName(ensName).then(_ => address = _)
		}
	}

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
		user = creators.find(c => c.address.toLowerCase() == address?.toLowerCase()) || {
			profile: {
				name: address ?? 'Loading profile...',
				summary: '',
				avatar: 'https://picsum.photos/200/200',
				cover: 'https://picsum.photos/1920/1080'
			}
		}
	}

	let profile = {}
	$: if(user?.profile)
		profile = user.profile

	// $: console.log('addressOrENS', addressOrENS, 'address', address, 'user', user, 'profile', profile)


	let currentStreamableETHSubscriptionTo, currentStreamableETHSubscriptionFrom
	let currentStreamableDAISubscriptionTo, currentStreamableDAISubscriptionFrom
	$: if(address && $wallet?.address && getSubscription){
		currentStreamableETHSubscriptionTo = getSubscription($wallet.address, address, 'ETH')
		currentStreamableDAISubscriptionTo = getSubscription($wallet.address, address, 'DAI')
		currentStreamableETHSubscriptionFrom = getSubscription(address, $wallet.address, 'ETH')
		currentStreamableDAISubscriptionFrom = getSubscription(address, $wallet.address, 'DAI')
	}
	$: console.log('currentStreamableETHSubscriptionTo', $currentStreamableETHSubscriptionTo)


	import AllTransactions from '../../components/AllTransactions.svelte'
	import Footer from '../../components/Footer.svelte'
	import SubscribeWidget from '../../components/SubscribeWidget.svelte'
	import SubscriptionsSummary from '../../components/SubscriptionsSummary.svelte'
</script>

<style>
	article {
		display: grid;
	}
	.main {
		justify-self: center;
		max-width: 70em;

		justify-content: center;
		flex-wrap: wrap;
		align-items: start;
		--space-inner: 2em;
	}
	.main .column {
		--space-inner: 1em;
	}

	.subscribe-widget {
		flex: 20em 0 0;
	}
	.activity {
		flex: 35em 1;
	}

	.profile-image-position {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 0;
	}
	.profile-info {
		justify-items: center;
		padding-top: 4em;
		text-align: center;
	}
	.profile-info p {
		display: flex;
		justify-content: center;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 1em;
	}
	.profile-info .second-line {
		font-size: 1.2em;
	}
	.profile-info .summary {
		color: var(--accent-color);
		font-weight: 500;
	}
	.profile-info a {
		font-size: 0.9em;
	}
	.profile-info .about {
		max-width: 40rem;
	}
</style>

<article>
	<header>
		<div class="cover w-full h-40 shadow-inner" style={`background-image: url(${profile.cover}); background-position: center; background-size: cover;`} />
		<div class="profile-image-position">
			<img src={profile.avatar} alt="avatar" class="w-24 h-24 border-4 border-white border-solid rounded-full" />
		</div>
		<section class="profile-info column">
			<h1>{profile.name || address}</h1>
			<p class="second-line">
				{#if profile.summary}
					<span class="summary">{profile.summary}</span>
				{/if}
				{#if profile.website}
					<a href={profile.website} target="_blank">{profile.website.replace(/^https?:\/\//, '')}</a>
				{/if}
				{#if profile.twitter}
					<a href={profile.twitter} target="_blank">{profile.twitter.replace(/^https?:\/\/twitter\.com\//, '@')}</a>
				{/if}
			</p>
			{#if profile.about}
				<p class="about">{profile.about}</p>
			{/if}
		</section>
	</header>
	<!-- {#if currentStreamableETHSubscriptionFrom && $currentStreamableETHSubscriptionFrom}
		This user is subscribed to you.
	{/if}
	{#if currentStreamableDAISubscriptionFrom && $currentStreamableDAISubscriptionFrom}
		This user is subscribed to you.
	{/if} -->
	<section class="main flex">
		<div class="subscribe-widget column">
			<h3>Subscribe</h3>
			<SubscribeWidget {address} {profile} />
		</div>
		<div class="activity column">
			<h3>Activity</h3>
			<SubscriptionsSummary {user} />
		</div>
	</section>
</article>

<!-- <div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions {user} />
	</section>

	<Footer />
</div> -->
