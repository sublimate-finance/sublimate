<script lang="ts">
	import Button from '../components/Button.svelte'
	import CreatorSummary from '../components/CreatorSummary.svelte'
import Footer from '../components/Footer.svelte'

	const creator = {
		name: 'money.eth',
		summary: 'Defi Builder at Curve.fi.',
		avatar: 'https://picsum.photos/200/200',
		cover: 'https://picsum.photos/1920/1080'
	}
</script>

<section class="flex flex-col pb-24">
	<div class="w-full h-40 shadow-inner" style={`background-image: url(${creator.cover}); background-position: center; background-size: cover;`} />
	<div class="relative flex flex-col items-center">
		<img src={creator.avatar} alt="avatar" class="w-24 h-24 absolute top-0 left-1/2 transform -translate-x-1/2 -mt-20 border-4 border-white border-solid rounded-full" />
		<div class="flex flex-col items-center space-y-2 mt-10">
			<span class="font-bold text-gray-900">{creator.name}</span>
			<span class="text-primary-200">{creator.summary}</span>
		</div>
	</div>
	<div class="flex flex-row px-32 space-x-16 w-full mt-10">
		<div class="flex flex-col space-y-4 items-start w-80">
			<span class="text-gray-900 font-bold">Subscribe</span>
			<div class="flex flex-col space-y-3 border-primary-200 border-solid border-2 border-opacity-50 rounded-md px-8 py-4 w-full">
				<input placeholder="1.00 ETH" class="p-3 text-center" />
				<input placeholder="per month" class="p-3 text-center" />
				<button class="bg-primary-100 bg-opacity-25 text-gray-900 px-4 py-3 text-gray-900 font-bold rounded-md">Subscribe</button>
			</div>
		</div>
		<div class="flex-1 flex-col space-y-4 items-start">
			<span class="text-gray-900 font-bold">Profile summary</span>
			<div class="flex flex-col rounded-md overflow-hidden">
				<div class="flex flex-row font-semibold text-gray-900">
					<button class="flex-1 flex flex-row items-center justify-center p-3 bg-white shadow-inner">
						Donations
					</button>
					<button class="flex-1 flex flex-row items-center justify-center p-3 bg-white bg-opacity-20">
						Summary
					</button>
					<button class="flex-1 flex flex-row items-center justify-center p-3 bg-white bg-opacity-20">
						Supporting
					</button>
				</div>
				<div class="p-4 bg-white text-gray-600">
					<table class="table-auto w-full border-separate" style="border-spacing: 1rem;">
						<thead>
							<tr>
								<th>Asset</th>
								<th>Rate</th>
								<th># of donators</th>
								<th>%</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="flex flex-row items-center justify-center space-x-2">
										<img src="/images/token/eth.png" alt="eth" class="w-5 h-5 rounded-full" />
										<span>ETH</span>
									</div>
								</td>
								<td><div class="flex flex-row items-center justify-center"><b class="font-bold">7.85 ETH</b>/month</div></td>
								<td><div class="flex flex-row items-center justify-center">12</td>
								<td>90%</td>
							</tr>
							<tr>
								<td>
									<div class="flex flex-row items-center justify-center space-x-2">
										<img src="/images/token/dai.png" alt="dai" class="w-5 h-5 rounded-full" />
										<span>DAI</span>
									</div>
								</td>
								<td><div class="flex flex-row items-center justify-center"><b class="font-bold">23.4 DAI</b>/month</div></td>
								<td><div class="flex flex-row items-center justify-center">3</td>
								<td>10%</td>
							</tr>
							<!-- <tr>
								<td class="py-1">
									<div class="flex flex-row items-center justify-center space-x-2">
										Total
									</div>
								</td>
								<td>Rate</td>
								<td># of donators</td>
								<td>%</td>
							</tr> --> <!-- TODO: compute total in which currency? usd? -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="bg-white">
	<section class="flex flex-col items-center px-8 py-16 space-y-4 mb-32">
		<span class="text-gray-900 font-bold">All transactions</span>
		<div class="flex flex-row space-x-8 w-full">
			<div class="flex flex-row w-1/2 justify-end">
				<div class="flex flex-row items-center px-6 py-1 bg-primary-100 bg-opacity-25 shadow-inner rounded-md space-x-4 text-gray-600">
					<button class="w-16">block</button>
					<button class="w-16 text-gray-900 px-3 p-1 bg-white rounded-full">day</button>
					<button class="w-16">month</button>
					<button class="w-16">year</button>
				</div>
			</div>
			<div class="flex flex-row w-1/2 justify-start">
				<div class="flex flex-row items-center w-64">
					<button class="flex flex-row w-1/2 items-center justify-center px-4 py-2 bg-primary-100 bg-opacity-25 rounded-l-md shadow-inner">
						Filter
					</button>
					<button class="flex flex-row w-1/2 items-center justify-center px-4 py-2 bg-primary-100 bg-opacity-10 rounded-r-md ">
						By rate
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-row space-x-0 w-full max-w-6xl mx-auto bg-primary-100 bg-opacity-10 rounded-md p-4">
			<div class="flex flex-col w-full items-start">
				<span class="font-bold">Donations</span>
			</div>
			<div class="flex flex-col w-full items-end">
				<span class="font-bold">Supporting</span>
			</div>
		</div>
		<div class="flex flex-row">
			<div class="w-1/2">
				<!-- donations -->
			</div>
			<div class="w-1/2">
				<!-- supporting -->
			</div>
		</div>
	</section>
	
	<Footer />
</div>