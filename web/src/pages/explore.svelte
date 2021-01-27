<script lang="ts">
	const creators = [{
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200',
		subscriptionData: [{
			asset: 'ETH',
			incomingRate: 100,
			subscriberCount: 10,
		}, {
			asset: 'DAI',
			incomingRate: 10,
			subscriberCount: 5,
		}]
	}, {
		name: '0x15A3FD40...',
		summary: 'NFT Creator at Aavegotchi',
		image: 'https://picsum.photos/200/200?1',
	}, {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200?2',
	}, {
		name: '0x15A3FD40...',
		summary: 'NFT Creator at Aavegotchi',
		image: 'https://picsum.photos/200/200?1',
	}, {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200?2',
	}, {
		name: '0x15A3FD40...',
		summary: 'NFT Creator at Aavegotchi',
		image: 'https://picsum.photos/200/200?1',
	}, {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200?2',
	}, {
		name: '0x15A3FD40...',
		summary: 'NFT Creator at Aavegotchi',
		image: 'https://picsum.photos/200/200?1',
	}, {
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200?2',
	}]

	import CreatorCards from '../components/CreatorCards.svelte'
</script>

<section>
	<h1>Explore Creators</h1>
	<CreatorCards {creators} />
</section>