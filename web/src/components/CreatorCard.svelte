<script lang="ts">
	import { TimeInterval } from '../types/time-intervals'

	// Data
	export let ens
	export let address
	export let profile: {
		name: string
		summary: string
		avatar: string | URL
		cover: string | URL
	}
	export let user


	// Display options
	export let timeInterval = TimeInterval.Day
	export let baseCurrency = 'ETH'


	import Button from './Button.svelte'
	import IncomingSubscriptionsSummary from './IncomingSubscriptionsSummary.svelte'
</script>

<style>
	.creator-card {
		--space-inner: 0.75em;
		justify-items: center;
		text-align: center;
	}

	img {
		border-radius: 50%;
	}

	.summary {
		color: var(--accent-color);
		font-weight: normal;
	}
</style>

<article class="creator-card card">
	<img src={profile.avatar?.toString() ?? `https://picsum.photos/200/200?${profile.name}`} alt={profile.name} width="100" />
	<h3>{profile.name}</h3>
	<h4 class="summary">{profile.summary}</h4>
	<IncomingSubscriptionsSummary view="basic" {...user} bind:timeInterval={timeInterval} bind:baseCurrency={baseCurrency} />
	<Button href="creator/{profile.ens || address}">Visit Creator</Button>
</article>
