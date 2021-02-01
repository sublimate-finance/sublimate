<script lang="ts">
	import { TimeInterval } from '../types/time-intervals'
import Link from '../_routing/curi/Link.svelte'

	// Data
	export let profile: {
		name: string
		summary: string
		avatar: string | URL
		cover: string | URL
	}
	export let incomingSubscriptions


	// Display options
	export let timeInterval = TimeInterval.Day
	export let baseCurrency = 'ETH'


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

<Link to="/creator/{profile.name}">
<article class="creator-card card">
	<img src={profile.avatar?.toString() ?? `https://picsum.photos/200/200?${profile.name}`} alt={profile.name} width="100" />
	<h3>{profile.name}</h3>
	<h4 class="summary">{profile.summary}</h4>
	<IncomingSubscriptionsSummary {incomingSubscriptions} {timeInterval} {baseCurrency} />
</article>
</Link>
