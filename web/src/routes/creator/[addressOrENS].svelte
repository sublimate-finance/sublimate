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

	$: address = addressOrENS && utils.isAddress(addressOrENS) ? addressOrENS : wallet?.provider?.resolveName(addressOrENS)

	// TODO: Get profile from The Graph using address
	$: profile = address && creators.find(c => c.address.toLowerCase() == address.toLowerCase())?.profile || placeholderProfile
	$: placeholderProfile = {
		name: address ?? 'Loading profile...',
		summary: '',
		avatar: 'https://picsum.photos/200/200',
		cover: 'https://picsum.photos/1920/1080'
	}


	let user
	let userStore
	$: if(getUser && address){
		userStore = getUser(address)
		console.log('user', userStore, $userStore)
	}
	$: if(userStore)
		user = $userStore


	let currentStreamableETHSubscriptionTo, currentStreamableETHSubscriptionFrom
	let currentStreamableDAISubscriptionTo, currentStreamableDAISubscriptionFrom
	$: if(address && $wallet?.address && getSubscription){
		currentStreamableETHSubscriptionTo = getSubscription($wallet.address, address, 'ETH')
		currentStreamableDAISubscriptionTo = getSubscription($wallet.address, address, 'DAI')
		currentStreamableETHSubscriptionFrom = getSubscription(address, $wallet.address, 'ETH')
		currentStreamableDAISubscriptionFrom = getSubscription(address, $wallet.address, 'DAI')
	}
	$: console.log('currentStreamableETHSubscriptionTo', currentStreamableETHSubscriptionTo)


	import AllTransactions from '../../components/AllTransactions.svelte'
	import Footer from '../../components/Footer.svelte'
	import SubscribeWidget from '../../components/SubscribeWidget.svelte'
	import SubscriptionsSummary from '../../components/SubscriptionsSummary.svelte'
</script>

<section class="flex flex-col pb-24">
	<div class="w-full h-40 shadow-inner" style={`background-image: url(${profile.cover}); background-position: center; background-size: cover;`} />
	<div class="relative flex flex-col items-center">
		<img src={profile.avatar} alt="avatar" class="w-24 h-24 absolute top-0 left-1/2 transform -translate-x-1/2 -mt-20 border-4 border-white border-solid rounded-full" />
		<div class="flex flex-col items-center space-y-2 mt-10">
			<h1>{profile.name}</h1>
			<span class="text-primary-200">{profile.summary}</span>
		</div>
	</div>
	{#if currentStreamableETHSubscriptionFrom && $currentStreamableETHSubscriptionFrom}
		This user is subscribed to you.
	{/if}
	{#if currentStreamableDAISubscriptionFrom && $currentStreamableDAISubscriptionFrom}
		This user is subscribed to you.
	{/if}
	<div class="flex flex-row px-32 space-x-16 w-full mt-10">
		<div class="flex flex-col space-y-4 items-start w-80">
			<h3>Subscribe</h3>
			<SubscribeWidget {address} {profile} />
		</div>
		<div class="flex-1 flex-col space-y-4 items-start">
			<h3>Profile Summary</h3>
			<SubscriptionsSummary {user} />
		</div>
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions {user} />
	</section>

	<Footer />
</div>
