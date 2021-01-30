
<script lang="ts">
	import { featuredCreators } from '../stores/creators'

	import Button from '../components/Button.svelte'
	import CreatorCards from '../components/CreatorCards.svelte'
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

	#creators :global(.creator-cards) {
		font-size: 0.6em;
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
	<CreatorCards creators={featuredCreators} />
	<div>
		<Button href="explore">Explore Creators</Button>
	</div>
</section>

