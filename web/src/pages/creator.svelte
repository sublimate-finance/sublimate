<script lang="ts">
	const profile = {
		name: 'money.eth',
		summary: 'Defi Builder at Curve.fi.',
		avatar: 'https://picsum.photos/200/200',
		cover: 'https://picsum.photos/1920/1080'
	}

	import AllTransactions from '../components/AllTransactions.svelte'
	import Button from '../components/Button.svelte'
	import Footer from '../components/Footer.svelte'
	import ProfileSummary from '../components/ProfileSummary.svelte'
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
	<div class="flex flex-row px-32 space-x-16 w-full mt-10">
		<div class="flex flex-col space-y-4 items-start w-80">
			<h3>Subscribe</h3>
			<div class="flex flex-col space-y-3 border-primary-200 border-solid border-2 border-opacity-50 rounded-md px-8 py-4 w-full">
				<input placeholder="1.00 ETH" class="p-3 text-center" />
				<input placeholder="per month" class="p-3 text-center" />
				<Button class="accented">Subscribe</Button>
			</div>
		</div>
		<div class="flex-1 flex-col space-y-4 items-start">
			<h3>Profile Summary</h3>
			<ProfileSummary user={profile} />
		</div>
	</div>
</section>

<div class="bg-white">
	<section class="w-full px-8 py-16 mb-32">
		<AllTransactions user={profile} />
	</section>

	<Footer />
</div>
