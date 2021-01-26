<script lang="ts">
	const creators = [{
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200',
	},{
		name: '0x15A3FD40...',
		summary: 'NFT Creator at Aavegotchi',
		image: 'https://picsum.photos/200/200?1',
	},{
		name: 'money.eth',
		summary: 'DeFi Builder, Curve.fi',
		image: 'https://picsum.photos/200/200?2',
	}]

	import Button from '../components/Button.svelte'
	import CreatorSummary from '../components/CreatorSummary.svelte'
</script>

<style>
	section {
		font-size: 1.5em;
		padding: 4rem;
		--space-inner: 2rem;
		min-height: 70vh;
		text-align: center;
		align-content: center;
	}

	section.centered {
		justify-items: center;
	}

	section.accented {
		background: radial-gradient(var(--accent-color-light) 50%, var(--accent-color));
	}
	section.accented h2 {
		color: white;
	}

	.creators {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
		font-size: 0.8em;
		gap: var(--space-inner);
	}
</style>

<!-- <section id="top">
	<h2>Reward creativity.<br>Make every second count.</h2>
	<div>
		<Button href="explore">Start accepting donations</Button>
	</div>

	<p>Accept continuous financial support from your audience.</p>
	<img src="images/wallet-illustration.png" />
</section> -->

<section id="top" class="centered">
	<img src="images/wallet-illustration.png" />

	<h2>Make every second count.</h2>

	<p>Accept <b>continuous financial support</b> from your audience, <br>so you can focus on <b>making amazing things</b>.</p>

	<div>
		<Button href="#creators">Learn more</Button>
		<Button href="dashboard" class="accented">Start a creator page</Button>
	</div>
</section>

<section id="creators" class="accented">
	<h2>We love our developers and content creators</h2>
	<div class="creators">
		{#each creators as creatorInfo}
			<CreatorSummary {...creatorInfo} />
		{/each}
	</div>
	<div>
		<Button href="explore">Explore Creators</Button>
	</div>
</section>

