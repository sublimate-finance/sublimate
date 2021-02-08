<script lang="ts">
	export let profile

	let isEditing = true // false
	let isSigning = false

	let editedProfile = profile
	// $: if(isEditing)
	// 	editedProfile = {...profile}


	import { onMount } from 'svelte'
	let walletStores, transactions, balance, chain, fallback, builtin, wallet, flow
	onMount(async () => walletStores = {transactions, balance, chain, fallback, builtin, wallet, flow} = (await import('../stores/wallet')).getWalletStores())

	async function saveProfile(){
		// TODO: Upload profile data to back end
		// await fetch('', {data: editedProfile})

		isSigning = true
		await (await walletStores.wallet.provider.getSigner()).signMessage('Sign this message to update your Sublimate creator profile!')
		// await flow.execute(async contracts => (await walletStores.wallet.provider.getSigner()).signMessage('Sign this message to update your Sublimate creator profile!'))
		isSigning = false

		profile = editedProfile
		isEditing = false
	}

	import Button from './Button.svelte'
	import LoadingSpinner from './LoadingSpinner.svelte'
</script>

<style>
	.card {
		--space-inner: 2.5em;
	}

	.column {
		--space-inner: 1.5em;
		align-content: start;
	}
	.card .row, .card .columns {
		--space-inner: 1em;
	}
	.card .column {
		--space-inner: 0.5em;
	}

	.cover-image {
		width: 100%;
		height: 8rem;
	}
</style>

<div class="card">
	{#if isEditing}
		<!-- <div class="column">
			<h3>Profile Picture</h3>
			<div class="row">
				<img src={editedProfile.avatar} alt="Avatar" class="block rounded-full" width="80" height="80" />
				<input type="file" class="button" />
			</div>
			<h2>
				<input type="text" class="boxed neumorphic" bind:value={editedProfile.name} placeholder="Name" />
			</h2>
			<p>
				<input type="text" class="boxed neumorphic" bind:value={editedProfile.summary} placeholder="Summary" />
			</p>
		</div> -->
		<div class="row">
			<img src={profile.avatar} alt="Avatar" class="block rounded-full" width="80" height="80" />
			<div class="column">
				<h2>
					<input type="text" class="boxed neumorphic" bind:value={editedProfile.name} placeholder="Name" />
				</h2>
				<p>
					<input type="text" class="boxed neumorphic" bind:value={editedProfile.summary} placeholder="Summary" />
				</p>
			</div>
		</div>
	{:else}
		<div class="row">
			<img src={profile.avatar} alt="Avatar" class="block rounded-full" width="80" height="80" />
			<div class="column">
				<h2>
					{profile.name}
				</h2>
				<p>
					{profile.summary}
				</p>
			</div>
		</div>
	{/if}
	{#if isEditing || profile.website || profile.twitter}
		<div class="column">
			<h3>Links</h3>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="column">
				<span>Website</span>
				{#if isEditing}
					<input type="text" class="neumorphic" bind:value={editedProfile.website} placeholder="https://sublimate.finance" />
				{:else if profile.website}
					<p>{profile.website}</p>
				{/if}
			</label>
			<label class="column">
				<span>Twitter</span>
				{#if isEditing}
					<input type="text" class="neumorphic" bind:value={editedProfile.twitter} placeholder="https://twitter.com/SublimateFinance" />
				{:else if profile.twitter}
					<p>{profile.twitter}</p>
				{/if}
			</label>
		</div>
	{/if}
	{#if isEditing || profile.about}
		<div class="column">
			<div class="column">
				<h3>About</h3>
				{#if isEditing}
					<textarea class="boxed neumorphic" bind:value={editedProfile.about} rows="2" />
				{:else}
					<p>{profile.about}</p>
				{/if}
			</div>
		</div>
	{/if}
	<div class="column">
		<h3>Cover image</h3>
		{#if isEditing}
			<!-- <input type="file" class="button" /> -->
		{/if}
		<img class="cover-image rounded-md shadow-inner" src={profile.cover} alt="Cover Image" height="100" />
	</div>
	<div class="stack">
		{#if isSigning}
			<div>
				<LoadingSpinner />
				Signing message...
			</div>
		{:else if isEditing}
			<div class="columns">
				<Button on:click={() => isEditing = false}>Cancel</Button>
				<Button on:click={() => saveProfile()} class="accented">Save</Button>
			</div>
		{:else}
			<Button on:click={() => isEditing = true}>Edit Profile</Button>
		{/if}
	</div>
</div>

